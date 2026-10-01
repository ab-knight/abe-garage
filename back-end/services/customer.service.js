import crypto from 'crypto'
import pool from '../config/db.config.js'

const CUSTOMER_SELECT = `
  SELECT
    c.customer_id,
    i.customer_first_name,
    i.customer_last_name,
    c.customer_email,
    c.customer_phone_number AS customer_phone,
    c.customer_added_date AS added_date,
    i.customer_active_status AS active_customer
  FROM customer_identifier c
  LEFT JOIN customer_info i ON c.customer_id = i.customer_id
`

export async function getAllCustomers(limit = 20, search = '') {
  const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : 20
  let query = `${CUSTOMER_SELECT} ORDER BY c.customer_id DESC LIMIT ${safeLimit}`
  let params = []

  if (search) {
    query = `${CUSTOMER_SELECT}
      WHERE i.customer_first_name LIKE ?
         OR i.customer_last_name LIKE ?
         OR c.customer_email LIKE ?
         OR c.customer_phone_number LIKE ?
      ORDER BY c.customer_id DESC LIMIT ${safeLimit}`
    const like = `%${search}%`
    params = [like, like, like, like]
  }

  const [rows] = await pool.query(query, params)
  return rows
}

export async function getCustomerById(id) {
  const [rows] = await pool.query(
    `${CUSTOMER_SELECT} WHERE c.customer_id = ?`,
    [id]
  )
  if (rows.length === 0) return null
  const customer = rows[0]

  const [vehicles] = await pool.query(
    `SELECT vehicle_id, vehicle_year, vehicle_make, vehicle_model,
            vehicle_type, vehicle_mileage, vehicle_tag,
            vehicle_serial_number, vehicle_color
     FROM customer_vehicle_info
     WHERE customer_id = ? ORDER BY vehicle_id DESC`,
    [id]
  )

  return { ...customer, vehicles }
}

export async function customerExists(email, phone) {
  const [rows] = await pool.query(
    'SELECT customer_id FROM customer_identifier WHERE customer_email = ? OR customer_phone_number = ?',
    [email, phone]
  )
  return rows.length > 0
}

export async function createCustomer(data) {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    const customer_hash = crypto.randomBytes(8).toString('hex')
    const [idResult] = await connection.query(
      `INSERT INTO customer_identifier
         (customer_email, customer_phone_number, customer_hash)
       VALUES (?, ?, ?)`,
      [data.customer_email, data.customer_phone, customer_hash]
    )
    const customerId = idResult.insertId

    await connection.query(
      `INSERT INTO customer_info
         (customer_id, customer_first_name, customer_last_name, customer_active_status)
       VALUES (?, ?, ?, ?)`,
      [
        customerId,
        data.customer_first_name,
        data.customer_last_name,
        data.active_customer ?? 1,
      ]
    )

    await connection.commit()
    return { customer_id: customerId }
  } catch (err) {
    await connection.rollback()
    throw err
  } finally {
    connection.release()
  }
}

// Returns 0 if not found.
export async function updateCustomer(data) {
  const connection = await pool.getConnection()
  try {
    const [exists] = await connection.query(
      'SELECT customer_id FROM customer_identifier WHERE customer_id = ?',
      [data.customer_id]
    )
    if (exists.length === 0) {
      connection.release()
      return 0
    }

    await connection.beginTransaction()

    if (data.customer_email !== undefined || data.customer_phone !== undefined) {
      const idFields = {}
      if (data.customer_email !== undefined) idFields.customer_email = data.customer_email
      if (data.customer_phone !== undefined) idFields.customer_phone_number = data.customer_phone
      await connection.query('UPDATE customer_identifier SET ? WHERE customer_id = ?', [
        idFields,
        data.customer_id,
      ])
    }

    const infoFields = {}
    if (data.customer_first_name !== undefined) infoFields.customer_first_name = data.customer_first_name
    if (data.customer_last_name !== undefined) infoFields.customer_last_name = data.customer_last_name
    if (data.active_customer !== undefined) infoFields.customer_active_status = data.active_customer
    if (Object.keys(infoFields).length > 0) {
      await connection.query('UPDATE customer_info SET ? WHERE customer_id = ?', [
        infoFields,
        data.customer_id,
      ])
    }

    await connection.commit()
    connection.release()
    return 1
  } catch (err) {
    await connection.rollback()
    connection.release()
    throw err
  }
}

export async function deleteCustomer(id) {
  const [result] = await pool.query(
    'DELETE FROM customer_identifier WHERE customer_id = ?',
    [id]
  )
  return result.affectedRows
}
