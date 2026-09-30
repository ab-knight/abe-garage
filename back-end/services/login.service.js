import bcrypt from 'bcrypt'
import { getEmployeeByEmail } from './employee.service.js'

// Returns { employee } on success or { error } on failure
export async function logIn(employee_email, employee_password) {
  try {
    const employee = await getEmployeeByEmail(employee_email)

    if (!employee) {
      return { error: 'Invalid email or password' }
    }

    // Only active employees can log in
    if (!employee.active_employee) {
      return { error: 'Account is inactive. Contact an administrator.' }
    }

    const passwordOk = await bcrypt.compare(
      employee_password,
      employee.employee_password_hashed
    )

    if (!passwordOk) {
      return { error: 'Invalid email or password' }
    }

    // Never send the hash back
    delete employee.employee_password_hashed
    return { employee }
  } catch (err) {
    return { error: err.message }
  }
}
