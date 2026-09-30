import { Link } from 'react-router-dom'

const cards = [
  { kicker: 'OPEN FOR ALL', title: 'All Orders', linkText: 'LIST OF ORDERS +', to: '/admin/orders', icon: 'fa-solid fa-list-check' },
  { kicker: 'OPEN FOR LEADS', title: 'New Orders', linkText: 'ADD ORDER +', to: '/admin/order', icon: 'fa-solid fa-plus' },
  { kicker: 'OPEN FOR ADMINS', title: 'Employees', linkText: 'LIST OF EMPLOYEES +', to: '/admin/employees', icon: 'fa-solid fa-users' },
  { kicker: 'OPEN FOR ADMINS', title: 'Add Employee', linkText: 'READ MORE +', to: '/admin/add-employee', icon: 'fa-solid fa-user-plus' },
  { kicker: 'OPEN FOR LEADS', title: 'Customers', linkText: 'LIST OF CUSTOMERS +', to: '/admin/customers', icon: 'fa-solid fa-address-book' },
  { kicker: 'SERVICE AND REPAIRS', title: 'Engine Service & Repair', linkText: 'READ MORE +', to: '/service', icon: 'fa-solid fa-gears' },
  { kicker: 'SERVICE AND REPAIRS', title: 'Tyre & Wheels', linkText: 'READ MORE +', to: '/service', icon: 'fa-solid fa-life-ring' },
  { kicker: 'SERVICE AND REPAIRS', title: 'Denting & Painting', linkText: 'READ MORE +', to: '/service', icon: 'fa-solid fa-car' },
  { kicker: 'SERVICE AND REPAIRS', title: 'All Services', linkText: 'READ MORE +', to: '/service', icon: 'fa-solid fa-screwdriver-wrench' },
]

export default function DashboardCards() {
  return (
    <>
      <p className="dash-desc">
        Welcome to the control center. From here you can track every order
        in the workshop, manage employees and customers, and keep the
        service catalog up to date. Cards marked OPEN FOR ADMINS need an
        administrator account — the rest follow your role.
      </p>

      <div className="dash-grid">
        {cards.map((card) => (
          <Link key={card.title} to={card.to} className="dash-card">
            <small>{card.kicker}</small>
            <h2>{card.title}</h2>
            <div className="dash-card-foot">
              <span>{card.linkText}</span>
              <i className={card.icon}></i>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
