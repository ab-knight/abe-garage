import { useAuth } from '../../context/AuthContext'
import LoginForm from '../../components/LoginForm/LoginForm'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import ServicesManager from '../../components/ServicesManager/ServicesManager'

// Admin-only service catalog: list + add form
export default function Services() {
  const { isLogged, isAdmin } = useAuth()

  if (!isLogged) return <LoginForm />
  if (!isAdmin)
    return <div>You are not authorized to access this page</div>

  return (
    <div className="admin-page">
      <AdminMenu />
      <main className="admin-content">
        <h1>
          Services we provide <span className="red-line-admin"></span>
        </h1>
        <p className="dash-desc">
          The service catalog powers the public Services page and every new
          order. Add each job once with a clear description — managers pick
          from this list when creating orders.
        </p>
        <ServicesManager />
      </main>
    </div>
  )
}
