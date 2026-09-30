import { Link } from 'react-router-dom'

export default function Unauthorized() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1>You are not authorized to access this page</h1>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </div>
  )
}
