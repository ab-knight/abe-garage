import * as employeeService from '../services/employee.service.js'

// GET /api/employees?limit=10
// → { limit, employees: [...] }
export async function getAllEmployees(req, res) {
  try {
    const limit = parseInt(req.query.limit, 10) || 10
    const employees = await employeeService.getAllEmployees(limit)
    res.status(200).json({ limit, employees })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET /api/employee/:id
export async function getEmployeeById(req, res) {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id)
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' })
    }
    res.status(200).json(employee)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// POST /api/employee
// → { success: "true" }
export async function createEmployee(req, res) {
  try {
    const {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
    } = req.body

    if (
      !employee_email ||
      !employee_first_name ||
      !employee_last_name ||
      !employee_phone ||
      !employee_password
    ) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (await employeeService.emailExists(employee_email)) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    await employeeService.createEmployee({
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
    })

    res.status(200).json({ success: 'true' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// PUT /api/employee
// → { success: "true" }
export async function updateEmployee(req, res) {
  try {
    const {
      employee_id,
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_id,
    } = req.body

    if (!employee_id) {
      return res.status(400).json({ error: 'employee_id is required' })
    }

    const affected = await employeeService.updateEmployee({
      employee_id,
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_id,
    })

    if (affected === 0) {
      return res.status(404).json({ error: 'Employee not found' })
    }

    res.status(200).json({ success: 'true' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// DELETE /api/employee/:id — admins only, cannot delete yourself
export async function deleteEmployee(req, res) {
  try {
    const id = Number(req.params.id)
    if (req.employee?.employee_id === id) {
      return res.status(400).json({ error: 'You cannot delete your own account' })
    }
    const affected = await employeeService.deleteEmployee(id)
    if (affected === 0) {
      return res.status(404).json({ error: 'Employee not found' })
    }
    res.status(200).json({ success: 'true' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
