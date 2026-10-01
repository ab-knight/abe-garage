import pool from '../config/db.config.js'

const REQUIRED = [
  'customer_id',
  'vehicle_year',
  'vehicle_make',
  'vehicle_model',
  'vehicle_type',
  'vehicle_tag',
  'vehicle_serial_number',
  'vehicle_color',
]

export async function createVehicle(data) {
  for (const field of REQUIRED) {
    if (data[field] === undefined || data[field] === '') {
      throw new Error(`${field} is required`)
    }
  }

  const [[customer]] = await pool.query(
    'SELECT customer_id FROM customer_identifier WHERE customer_id = ?',
    [data.customer_id]
  )
  if (!customer) throw new Error('Customer not found')

  const [result] = await pool.query(
    `INSERT INTO customer_vehicle_info
       (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type,
        vehicle_mileage, vehicle_tag, vehicle_serial_number, vehicle_color)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.customer_id,
      data.vehicle_year,
      data.vehicle_make,
      data.vehicle_model,
      data.vehicle_type,
      data.vehicle_mileage || null,
      data.vehicle_tag,
      data.vehicle_serial_number,
      data.vehicle_color,
    ]
  )
  return { vehicle_id: result.insertId }
}

export async function getVehiclesByCustomer(customer_id) {
  const [rows] = await pool.query(
    `SELECT vehicle_id, vehicle_year, vehicle_make, vehicle_model,
            vehicle_type, vehicle_mileage, vehicle_tag,
            vehicle_serial_number, vehicle_color
     FROM customer_vehicle_info
     WHERE customer_id = ? ORDER BY vehicle_id DESC`,
    [customer_id]
  )
  return rows
}

export async function getVehicleById(id) {
  const [rows] = await pool.query(
    `SELECT vehicle_id, customer_id, vehicle_year, vehicle_make, vehicle_model,
            vehicle_type, vehicle_mileage, vehicle_tag,
            vehicle_serial_number, vehicle_color
     FROM customer_vehicle_info
     WHERE vehicle_id = ?`,
    [id]
  )
  return rows[0] || null
}

export async function updateVehicle(id, data) {
  const fields = []
  const values = []
  const allowed = ['vehicle_year', 'vehicle_make', 'vehicle_model', 'vehicle_type',
                   'vehicle_mileage', 'vehicle_tag', 'vehicle_serial_number', 'vehicle_color']
  for (const key of allowed) {
    if (data[key] !== undefined && data[key] !== '') {
      fields.push(`${key} = ?`)
      values.push(data[key])
    }
  }
  if (fields.length === 0) return 0
  values.push(id)
  const [result] = await pool.query(
    `UPDATE customer_vehicle_info SET ${fields.join(', ')} WHERE vehicle_id = ?`,
    values
  )
  return result.affectedRows
}

export async function deleteVehicle(id) {
  const [result] = await pool.query(
    'DELETE FROM customer_vehicle_info WHERE vehicle_id = ?',
    [id]
  )
  return result.affectedRows
}
