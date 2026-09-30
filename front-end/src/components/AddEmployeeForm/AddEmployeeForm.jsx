import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { createEmployee } from '../../services/employee.service'

function AddEmployee() {
  const [employee_email, setEmail] = useState('')
  const [employee_first_name, setFirstName] = useState('')
  const [employee_last_name, setLastName] = useState('')
  const [employee_phone, setPhone] = useState('')
  const [employee_password, setPassword] = useState('')
  const [company_role_id, setRole] = useState(1) // 1 = Employee
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)
  const { employee } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    // Client-side validation flag
    let valid = true
    if (
      !employee_email ||
      !employee_first_name ||
      !employee_last_name ||
      !employee_phone ||
      !employee_password
    ) {
      valid = false
    }
    if (!valid) {
      setServerError('All fields are required')
      return
    }

    try {
      const data = await createEmployee(
        {
          employee_email,
          employee_first_name,
          employee_last_name,
          employee_phone,
          employee_password,
          active_employee: 1,
          company_role_id: Number(company_role_id),
        },
        employee?.token
      )

      if (data.error) {
        setServerError(data.error)
        setSuccess(false)
      } else {
        setServerError('')
        setSuccess(true)
        setTimeout(() => navigate('/admin/employees'), 2000)
      }
    } catch (err) {
      setServerError(err.message)
      setSuccess(false)
    }
  }

  return (
    <main className="add-employee">
      <div className="employee-container">
        <h1>
          Add a new employee
          <span className="red-line-admin"></span>
        </h1>

        {serverError && <p className="server-error">{serverError}</p>}
        {success && (
          <p className="server-success">Employee added successfully!</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Employee email"
            value={employee_email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Employee first name"
            value={employee_first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Employee last name"
            value={employee_last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Employee phone (555-555-5555)"
            value={employee_phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <select
            value={company_role_id}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value={1}>Employee</option>
            <option value={2}>Manager</option>
            <option value={3}>Admin</option>
          </select>

          <input
            type="password"
            placeholder="Employee password (min 6 characters)"
            value={employee_password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />

          <button type="submit">ADD EMPLOYEE</button>
        </form>
      </div>
    </main>
  );
}

export default AddEmployee
