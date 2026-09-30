import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  getEmployeeById,
  updateEmployee,
} from '../../services/employee.service'

export default function EditEmployeeForm() {
  const { id } = useParams()
  const { employee } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [company_role_id, setRole] = useState(1)
  const [active_employee, setActive] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)

  const isSelf = employee && Number(id) === employee.employee_id

  useEffect(() => {
    getEmployeeById(id, employee?.token)
      .then((data) => {
        if (data.error) {
          setServerError(data.error)
        } else {
          setEmail(data.employee_email || '')
          setFirstName(data.employee_first_name || '')
          setLastName(data.employee_last_name || '')
          setPhone(data.employee_phone || '')
          setRole(data.employee_role_id || 1)
          setActive(!!data.active_employee)
          setLoaded(true)
        }
      })
      .catch((err) => setServerError(err.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()

    let valid = true
    if (!firstName || !lastName || !phone) valid = false
    if (!valid) {
      setServerError('First name, last name and phone are required')
      return
    }

    try {
      const data = await updateEmployee(
        {
          employee_id: Number(id),
          employee_first_name: firstName,
          employee_last_name: lastName,
          employee_phone: phone,
          active_employee: active_employee ? 1 : 0,
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
        setTimeout(() => navigate('/admin/employees'), 1500)
      }
    } catch (err) {
      setServerError(err.message)
      setSuccess(false)
    }
  }

  return (
    <>
      <h1>
        Edit: {firstName} {lastName}{' '}
        <span className="red-line-admin"></span>
      </h1>

      {serverError && <p className="server-error">{serverError}</p>}
      {success && (
        <p className="server-success">Employee updated successfully!</p>
      )}
      {isSelf && (
        <p className="server-error">
          Warning: this is your own account — deactivating it or removing
          the admin role will lock you out.
        </p>
      )}

      {!loaded && !serverError && <p>Loading employee...</p>}

      {loaded && (
        <form className="edit-form" onSubmit={handleSubmit}>
          <p className="edit-email">Employee email: {email}</p>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            required
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
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

          <label className="active-check">
            <input
              type="checkbox"
              checked={active_employee}
              onChange={(e) => setActive(e.target.checked)}
            />
            Is active employee
          </label>

          <button type="submit" className="red-btn">
            UPDATE
          </button>
        </form>
      )}
    </>
  )
}
