import crypto from 'crypto'
import pool from '../config/db.config.js'

// Status codes shared by orders.order_status (label) and order_status.status (int)
export const ORDER_STATUS = {
  0: 'Received',
  1: 'In Progress',
  2: 'Completed',
}

export async function getCustomerEmail(customer_id) {
  const [rows] = await pool.query(
    'SELECT customer_email FROM customer_identifier WHERE customer_id = ?',
    [customer_id]
  )
  return rows[0]?.customer_email || null
}

export async function getAllOrders(limit = 20, customer_id = null) {
  const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : 20
  let query = `SELECT
       o.order_id,
       o.order_hash,
       o.order_date,
       o.order_status AS status,
       c.customer_email,
       i.customer_first_name,
       i.customer_last_name,
       e.employee_email AS employee_email
     FROM orders o
     JOIN customer_identifier c ON o.customer_id = c.customer_id
     LEFT JOIN customer_info i ON c.customer_id = i.customer_id
     JOIN employee e ON o.employee_id = e.employee_id`
  const params = []
  if (customer_id) {
    query += ' WHERE o.customer_id = ?'
    params.push(customer_id)
  }
  query += ` ORDER BY o.order_id DESC LIMIT ${safeLimit}`
  const [rows] = await pool.query(query, params)
  return rows
}

// Full detail for the tracking page. Vehicle = customer's most recently
// added vehicle (schema links vehicles to customers, not to orders).
export async function getOrderByHash(hash) {
  const [orders] = await pool.query(
    `SELECT
       o.order_id,
       o.order_hash,
       o.order_date,
       o.order_status AS status,
       oi.order_total_price,
       oi.order_estimated_completion_date,
       oi.order_completion_date,
       oi.order_additional_requests,
       oi.order_additional_requests_completed
     FROM orders o
     LEFT JOIN order_info oi ON o.order_id = oi.order_id
     WHERE o.order_hash = ?`,
    [hash]
  )
  if (orders.length === 0) return null
  const order = orders[0]

  const [[customer]] = await pool.query(
    `SELECT c.customer_email, c.customer_phone_number,
            i.customer_first_name, i.customer_last_name
     FROM orders o
     JOIN customer_identifier c ON o.customer_id = c.customer_id
     LEFT JOIN customer_info i ON c.customer_id = i.customer_id
     WHERE o.order_id = ?`,
    [order.order_id]
  )

  const [[vehicle]] = await pool.query(
    `SELECT v.vehicle_make, v.vehicle_model, v.vehicle_year,
            v.vehicle_color, v.vehicle_tag, v.vehicle_mileage
     FROM orders o
     JOIN customer_vehicle_info v ON o.customer_id = v.customer_id
     WHERE o.order_id = ?
     ORDER BY v.vehicle_id DESC LIMIT 1`,
    [order.order_id]
  )

  const [services] = await pool.query(
    `SELECT s.service_id, s.service_name, s.service_description,
            os.service_completed
     FROM order_services os
     JOIN common_services s ON os.service_id = s.service_id
     WHERE os.order_id = ?
     ORDER BY os.order_service_id ASC`,
    [order.order_id]
  )

  return { ...order, customer: customer || null, vehicle: vehicle || null, services }
}

export async function createOrder(data) {
  const [[customer]] = await pool.query(
    'SELECT customer_id FROM customer_identifier WHERE customer_id = ?',
    [data.customer_id]
  )
  if (!customer) throw new Error('Customer not found')

  const [[employee]] = await pool.query(
    'SELECT employee_id FROM employee WHERE employee_id = ?',
    [data.employee_id]
  )
  if (!employee) throw new Error('Employee not found')

  if (!Array.isArray(data.service_ids) || data.service_ids.length === 0) {
    throw new Error('At least one service is required')
  }
  const [found] = await pool.query(
    `SELECT service_id FROM common_services WHERE service_id IN (${data.service_ids.map(() => '?').join(',')})`,
    data.service_ids
  )
  if (found.length !== data.service_ids.length) {
    throw new Error('One or more services do not exist')
  }

  const order_hash = crypto.randomBytes(16).toString('hex')
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    const [orderResult] = await connection.query(
      'INSERT INTO orders (customer_id, employee_id, order_hash, order_status) VALUES (?, ?, ?, ?)',
      [data.customer_id, data.employee_id, order_hash, ORDER_STATUS[0]]
    )
    const orderId = orderResult.insertId

    await connection.query(
      `INSERT INTO order_info
         (order_id, order_total_price, order_estimated_completion_date, order_additional_requests)
       VALUES (?, ?, ?, ?)`,
      [
        orderId,
        data.order_total_price || 0,
        data.order_estimated_completion_date || null,
        data.order_additional_requests || '',
      ]
    )

    for (const serviceId of data.service_ids) {
      await connection.query(
        'INSERT INTO order_services (order_id, service_id) VALUES (?, ?)',
        [orderId, serviceId]
      )
    }

    await connection.query(
      'INSERT INTO order_status (order_id, order_status) VALUES (?, 0)',
      [orderId]
    )

    await connection.commit()
    return { order_hash }
  } catch (err) {
    await connection.rollback()
    throw err
  } finally {
    connection.release()
  }
}

// status: 0 Received | 1 In Progress | 2 Completed. Returns 0 if not found.
export async function updateOrderStatus(order_id, status) {
  if (!Object.keys(ORDER_STATUS).includes(String(status))) {
    throw new Error('Invalid status. Use 0 (Received), 1 (In Progress) or 2 (Completed).')
  }
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    const [result] = await connection.query(
      'UPDATE orders SET order_status = ? WHERE order_id = ?',
      [ORDER_STATUS[status], order_id]
    )
    if (result.affectedRows === 0) {
      await connection.rollback()
      connection.release()
      return 0
    }

    await connection.query(
      'UPDATE order_status SET order_status = ? WHERE order_id = ?',
      [status, order_id]
    )

    if (Number(status) === 2) {
      await connection.query(
        'UPDATE order_info SET order_completion_date = NOW() WHERE order_id = ?',
        [order_id]
      )
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
