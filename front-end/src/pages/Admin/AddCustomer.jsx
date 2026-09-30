import { useAuth } from '../../context/AuthContext'
import LoginForm from '../../components/LoginForm/LoginForm'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import AddCustomerForm from '../../components/AddCustomerForm/AddCustomerForm'

// Managers and Admins only
export default function AddCustomer() {
  const { isLogged, isAdmin, employee } = useAuth()
  const allowed = isAdmin || employee?.employee_role === 2

  if (!isLogged) return <LoginForm />
  if (!allowed)
    return <div>You are not authorized to access this page</div>

  return (
    <div className="admin-page">
      <AdminMenu />
      <main className="admin-content">
        <h1>
          Add a new customer <span className="red-line-admin"></span>
        </h1>
        <AddCustomerForm />
      </main>
    </div>
  )
}
