import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { formatAddedDate } from '../../util/format'

const apiUrl = import.meta.env.VITE_API_URL

export default function EmployeesTable() {
  const { employee } = useAuth()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const navigate = useNavigate()

  function load() {
    setLoading(true)
    fetch(`${apiUrl}/employees?limit=50`, {
      headers: employee?.token ? { 'x-access-token': employee.token } : {},
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setLoadError(data.error)
        else setEmployees(data.employees || [])
      })
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    // fetch-on-mount: intentional data load, not a render cascade
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee])

  async function handleDelete(id, email) {
    if (!window.confirm(`Delete employee ${email}? This cannot be undone.`)) {
      return
    }
    try {
      const res = await fetch(`${apiUrl}/employee/${id}`, {
        method: 'DELETE',
        headers: { 'x-access-token': employee?.token },
      })
      const data = await res.json()
      if (data.error) {
        setLoadError(data.error)
      } else {
        load()
      }
    } catch (err) {
      setLoadError(err.message)
    }
  }

  if (loading) return <p>Loading employees...</p>

  return (
    <>
      {loadError && <p className="server-error">{loadError}</p>}

      <table className="data-table">
        <thead>
          <tr>
            <th>Active</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Added Date</th>
            <th>Role</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employee_id}>
              <td>{emp.active_employee ? 'Yes' : 'No'}</td>
              <td>{emp.employee_first_name}</td>
              <td>{emp.employee_last_name}</td>
              <td>{emp.employee_email}</td>
              <td>{emp.employee_phone}</td>
              <td>{formatAddedDate(emp.added_date)}</td>
              <td>{emp.employee_role || '—'}</td>
              <td>
                <button
                  className="icon-btn"
                  title="Edit employee"
                  onClick={() => navigate(`/admin/employee/edit/${emp.employee_id}`)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  className="icon-btn"
                  title="Delete employee"
                  onClick={() => handleDelete(emp.employee_id, emp.employee_email)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
