import pool from '../config/db.config.js'

export async function getAllServices() {
  const [rows] = await pool.query(
    `SELECT service_id, service_name, service_description
     FROM common_services ORDER BY service_id ASC`
  )
  return rows
}

export async function serviceNameExists(name) {
  const [rows] = await pool.query(
    'SELECT service_id FROM common_services WHERE service_name = ?',
    [name]
  )
  return rows.length > 0
}

export async function createService(data) {
  const [result] = await pool.query(
    'INSERT INTO common_services (service_name, service_description) VALUES (?, ?)',
    [data.service_name, data.service_description]
  )
  return { service_id: result.insertId }
}

// Partial update. Returns 0 if not found.
export async function updateService(data) {
  const fields = {}
  if (data.service_name !== undefined) fields.service_name = data.service_name
  if (data.service_description !== undefined)
    fields.service_description = data.service_description
  if (Object.keys(fields).length === 0) return 1

  try {
    const [result] = await pool.query(
      'UPDATE common_services SET ? WHERE service_id = ?',
      [fields, data.service_id]
    )
    return result.affectedRows
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') throw new Error('Service name already exists')
    throw err
  }
}

// Deletes only when no order references it. Returns { deleted } or { inUse }.
export async function deleteService(id) {
  const [[used]] = await pool.query(
    'SELECT COUNT(*) AS n FROM order_services WHERE service_id = ?',
    [id]
  )
  if (used.n > 0) return { inUse: used.n }
  const [result] = await pool.query(
    'DELETE FROM common_services WHERE service_id = ?',
    [id]
  )
  return { deleted: result.affectedRows }
}
