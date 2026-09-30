import bcrypt from 'bcrypt'
import pool from '../config/db.config.js'

// Maps DB columns (employee + info + role) to the API response shape
const EMPLOYEE_SELECT = `
  SELECT
    e.employee_id,
    e.employee_email,
    i.employee_first_name,
    i.employee_last_name,
    i.employee_phone,
    e.employee_active_status AS active_employee,
    e.employee_added_date AS added_date,
    c.company_role_name AS employee_role,
    r.company_role_id AS employee_role_id
  FROM employee e
  LEFT JOIN employee_info i ON e.employee_id = i.employee_id
  LEFT JOIN employee_role r ON e.employee_id = r.employee_id
  LEFT JOIN company_roles c ON r.company_role_id = c.company_role_id
`

export async function getAllEmployees(limit = 10) {
  const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : 10
  const [rows] = await pool.query(
    `${EMPLOYEE_SELECT} ORDER BY e.employee_id ASC LIMIT ${safeLimit}`
  )
  return rows
}

export async function getEmployeeById(id) {
  const [rows] = await pool.query(
    `${EMPLOYEE_SELECT} WHERE e.employee_id = ?`,
    [id]
  )
  return rows[0] || null
}
export async function emailExists(email) {
  const [rows] = await pool.query(
    'SELECT employee_id FROM employee WHERE employee_email = ?',
    [email]
  )
  return rows.length > 0
}

// Deletes employee + info + pass + role (FK cascade). Returns 0 if not found.
export async function deleteEmployee(id) {
  const [result] = await pool.query(
    'DELETE FROM employee WHERE employee_id = ?',
    [id]
  )
  return result.affectedRows
}

// Full login lookup: employee + info + password hash + role
export async function getEmployeeByEmail(email) {
  const [rows] = await pool.query(
    `SELECT
       e.employee_id,
       e.employee_email,
       e.employee_active_status AS active_employee,
       i.employee_first_name,
       i.employee_last_name,
       p.employee_password_hashed,
       r.company_role_id AS employee_role
     FROM employee e
     LEFT JOIN employee_info i ON e.employee_id = i.employee_id
     LEFT JOIN employee_pass p ON e.employee_id = p.employee_id
     LEFT JOIN employee_role r ON e.employee_id = r.employee_id
     WHERE e.employee_email = ?`,
    [email]
  )
  return rows[0] || null
}

// Creates employee + info + password hash (+ role) in one transaction
export async function createEmployee(data) {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    const [empResult] = await connection.query(
      'INSERT INTO employee (employee_email, employee_active_status) VALUES (?, ?)',
      [data.employee_email, data.active_employee ?? 1]
    )
    const employeeId = empResult.insertId

    await connection.query(
      `INSERT INTO employee_info
        (employee_id, employee_first_name, employee_last_name, employee_phone)
       VALUES (?, ?, ?, ?)`,
      [
        employeeId,
        data.employee_first_name,
        data.employee_last_name,
        data.employee_phone,
      ]
    )

    const passwordHash = await bcrypt.hash(data.employee_password, 10)
    await connection.query(
      'INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)',
      [employeeId, passwordHash]
    )

    if (data.company_role_id) {
      await connection.query(
        'INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)',
        [employeeId, data.company_role_id]
      )
    }

    await connection.commit()
    return { employee_id: employeeId }
  } catch (err) {
    await connection.rollback()
    throw err
  } finally {
    connection.release()
  }
}

// Updates employee + employee_info + role. Returns affected count (0 = not found).
export async function updateEmployee(data) {
  const connection = await pool.getConnection()
  try {
    const [exists] = await connection.query(
      'SELECT employee_id FROM employee WHERE employee_id = ?',
      [data.employee_id]
    )
    if (exists.length === 0) {
      connection.release()
      return 0
    }

    await connection.beginTransaction()

    let affected = 0

    if (data.active_employee !== undefined) {
      const [result] = await connection.query(
        'UPDATE employee SET employee_active_status = ? WHERE employee_id = ?',
        [data.active_employee, data.employee_id]
      )
      affected = result.affectedRows
    }

    const infoFields = {}
    if (data.employee_first_name !== undefined)
      infoFields.employee_first_name = data.employee_first_name
    if (data.employee_last_name !== undefined)
      infoFields.employee_last_name = data.employee_last_name
    if (data.employee_phone !== undefined)
      infoFields.employee_phone = data.employee_phone

    if (Object.keys(infoFields).length > 0) {
      const [result] = await connection.query(
        'UPDATE employee_info SET ? WHERE employee_id = ?',
        [infoFields, data.employee_id]
      )
      affected = Math.max(affected, result.affectedRows)
    }

    if (data.company_role_id !== undefined) {
      // Upsert: employee may have been created before roles existed
      const [existing] = await connection.query(
        'SELECT employee_id FROM employee_role WHERE employee_id = ?',
        [data.employee_id]
      )
      if (existing.length > 0) {
        await connection.query(
          'UPDATE employee_role SET company_role_id = ? WHERE employee_id = ?',
          [data.company_role_id, data.employee_id]
        )
      } else {
        await connection.query(
          'INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)',
          [data.employee_id, data.company_role_id]
        )
      }
      affected = Math.max(affected, 1)
    }

    await connection.commit()
    return affected
  } catch (err) {
    await connection.rollback()
    throw err
  } finally {
    connection.release()
  }
}
