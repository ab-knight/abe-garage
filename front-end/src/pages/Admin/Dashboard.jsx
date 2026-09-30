import { useAuth } from '../../context/AuthContext'
import LoginForm from '../../components/LoginForm/LoginForm'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import DashboardCards from '../../components/DashboardCards/DashboardCards'

export default function Dashboard() {
  const { isLogged, isAdmin } = useAuth()

  if (!isLogged) return <LoginForm />
  if (!isAdmin)
    return <div>You are not authorized to access this page</div>

  return (
    <div className="admin-page">
      <AdminMenu />
      <main className="admin-content">
        <h1>
          Admin Dashboard <span className="red-line-admin"></span>
        </h1>
        <DashboardCards />
      </main>
    </div>
  )
}
