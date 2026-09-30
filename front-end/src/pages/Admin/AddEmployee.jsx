import { useAuth } from '../../context/AuthContext'
import LoginForm from '../../components/LoginForm/LoginForm'
import AddEmployeeForm from '../../components/AddEmployeeForm/AddEmployeeForm'
import AdminMenu from '../../components/AdminMenu/AdminMenu'

function AddEmployeePage() {
  const { isLogged, isAdmin } = useAuth()

  if (!isLogged) return <LoginForm />
  if (!isAdmin)
    return <div>You are not authorized to access this page</div>

  return (
    <div className="admin-page">
      <AdminMenu />
      <AddEmployeeForm />
    </div>
  );
}

export default AddEmployeePage
