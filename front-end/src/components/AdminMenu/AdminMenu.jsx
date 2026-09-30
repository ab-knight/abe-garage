import { Link } from 'react-router-dom'

function AdminMenu() {
  return (
    <aside className="admin-menu">
      <div className="admin-title">ADMIN MENU</div>

      <nav>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/order">New order</Link>
        <Link to="/admin/add-employee">Add employee</Link>
        <Link to="/admin/employees">Employees</Link>
        <Link to="/admin/add-customer">Add customer</Link>
        <Link to="/admin/customers">Customers</Link>
        <Link to="/admin/services">Services</Link>
      </nav>
    </aside>
  );
}

export default AdminMenu
