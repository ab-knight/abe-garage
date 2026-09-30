import { useAuth } from '../../context/AuthContext'
import LoginForm from '../../components/LoginForm/LoginForm'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import EmployeesTable from '../../components/EmployeesTable/EmployeesTable'

// Component-level authorization:
// not logged in → login form; logged in but not admin → message
export default function Employees() {
  const { isLogged, isAdmin } = useAuth()

  if (!isLogged) return <LoginForm />
  if (!isAdmin)
    return <div>You are not authorized to access this page</div>

  return (
    <div className="admin-page">
      <AdminMenu />
      <main className="admin-content">
        <h1>
          Employees <span className="red-line-admin"></span>
        </h1>
        <EmployeesTable />
      </main>
    </div>
  )
}
