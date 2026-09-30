import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1>404 — Page not found</h1>
      <p className="muted">
        The page you are looking for does not exist or was moved.
      </p>
      <p>
        <Link to="/" className="red-btn" style={{ textDecoration: 'none' }}>
          GO HOME
        </Link>
      </p>
    </div>
  )
}
