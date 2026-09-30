import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { logOut } from '../../services/login.service'

const PUBLIC_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/service', label: 'Service' },
  { to: '/contact', label: 'Contact US' },
]

export default function Header() {
  const { isLogged, setIsLogged, setIsAdmin, employee } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  function handleLogout(e) {
    e.preventDefault()
    logOut()
    setIsLogged(false)
    setIsAdmin(false)
    setMenuOpen(false)
    navigate('/login')
  }

  const links = isLogged
    ? [...PUBLIC_LINKS, { to: '/admin', label: 'Admin' }]
    : PUBLIC_LINKS

  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="top-message">Enjoy the Beso while we fix your car</div>
        <div className="opening-hours">Monday - Saturday 7:00AM - 6:00PM</div>
        <div className="header-top">
          {isLogged ? (
            <span>Welcome: {employee?.employee_first_name}</span>
          ) : (
            <span>Call us: +918247382834</span>
          )}
        </div>
      </div>

      <nav className="navigation">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <img src="/assets/logo.png" alt="Abe Garage" className="logo-img" />
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links${menuOpen ? ' nav-open' : ''}`}>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            {isLogged ? (
              <Link to="/login" onClick={handleLogout} className="login-btn">
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="login-btn"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
