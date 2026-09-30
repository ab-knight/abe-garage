import { useAuth } from '../../context/AuthContext'
import LoginForm from '../../components/LoginForm/LoginForm'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import OrdersTable from '../../components/OrdersTable/OrdersTable'

// All authenticated roles can view the orders list
export default function Orders() {
  const { isLogged } = useAuth()

  if (!isLogged) return <LoginForm />

  return (
    <div className="admin-page">
      <AdminMenu />
      <main className="admin-content">
        <h1>
          Orders <span className="red-line-admin"></span>
        </h1>
        <OrdersTable />
      </main>
    </div>
  )
}
