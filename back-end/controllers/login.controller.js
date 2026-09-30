import jwt from 'jsonwebtoken'
import * as loginService from '../services/login.service.js'

// POST /api/employee/login
// → { success: "true", token }  (token payload: id, email, role, first name)
export async function logIn(req, res) {
  try {
    const { employee_email, employee_password } = req.body

    if (!employee_email || !employee_password) {
      return res
        .status(400)
        .json({ error: 'Email and password are required' })
    }

    const result = await loginService.logIn(
      employee_email,
      employee_password
    )

    if (result.error) {
      return res.status(401).json({ error: result.error })
    }

    const payload = {
      employee_id: result.employee.employee_id,
      employee_email: result.employee.employee_email,
      employee_role: result.employee.employee_role,
      employee_first_name: result.employee.employee_first_name,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h',
    })

    res.status(200).json({ success: 'true', token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
