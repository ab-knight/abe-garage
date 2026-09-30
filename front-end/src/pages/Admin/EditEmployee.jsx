import { useAuth } from '../../context/AuthContext'
import LoginForm from '../../components/LoginForm/LoginForm'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import EditEmployeeForm from '../../components/EditEmployeeForm/EditEmployeeForm'

export default function EditEmployee() {
  const { isLogged, isAdmin } = useAuth()

  if (!isLogged) return <LoginForm />
  if (!isAdmin)
    return <div>You are not authorized to access this page</div>

  return (
    <div className="admin-page">
      <AdminMenu />
      <main className="admin-content">
        <EditEmployeeForm />
      </main>
    </div>
  )
}
