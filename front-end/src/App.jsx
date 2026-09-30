import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Service from './pages/Service'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Unauthorized from './pages/Unauthorized'
import NotFound from './pages/404'
import OrderDetail from './pages/OrderDetail'
import AddEmployee from './pages/Admin/AddEmployee'
import Orders from './pages/Admin/Orders'
import Customers from './pages/Admin/Customers'
import Employees from './pages/Admin/Employees'
import Dashboard from './pages/Admin/Dashboard'
import Services from './pages/Admin/Services'
import EditEmployee from './pages/Admin/EditEmployee'
import AddCustomer from './pages/Admin/AddCustomer'
import CustomerDetailsPage from './pages/Admin/CustomerDetailsPage'
import EditCustomer from './pages/Admin/EditCustomer'
import NewOrder from './pages/Admin/NewOrder'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import PrivateAuthRoute from './components/Auth/PrivateAuthRoute'

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Order tracking — public, no menu link (secret hash link) */}
        <Route path="/order/:orderHash" element={<OrderDetail />} />

        {/* Catch-all — must stay last */}
        <Route path="*" element={<NotFound />} />

        {/* Protected: all authenticated roles (1=Employee, 2=Manager, 3=Admin) */}
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />

        {/* Protected: Managers and Admins */}
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />

        {/* Protected: Admins only */}
        <Route
          path="/admin"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Dashboard />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />

        {/* Component-level authorization demo (checks inside the page) */}
        <Route path="/admin/employees" element={<Employees />} />

        {/* Protected: Admins only */}
        <Route
          path="/admin/services"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Services />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/employee/edit/:id"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditEmployee />
            </PrivateAuthRoute>
          }
        />

        {/* Protected: Managers and Admins */}
        <Route
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <AddCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CustomerDetailsPage />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer/edit/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EditCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/order"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <NewOrder />
            </PrivateAuthRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App
