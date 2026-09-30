import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { logIn } from '../../services/login.service'
import { getAuth } from '../../util/auth'

export default function LoginForm() {
  const [employee_email, setEmail] = useState('')
  const [employee_password, setPassword] = useState('')
  const [serverError, setServerError] = useState('')
  const { setEmployee, setIsLogged, setIsAdmin } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    // Client-side validation flag
    let valid = true
    if (!employee_email || !employee_password) {
      valid = false
    }
    if (!valid) {
      setServerError('Email and password are required')
      return
    }

    try {
      const data = await logIn({ employee_email, employee_password })

      if (data.error) {
        setServerError(data.error)
      } else {
        setServerError('')
        // Save the logged-in user (with token) in local storage
        localStorage.setItem('employee', JSON.stringify(data))
        // Refresh context so the header updates immediately
        const auth = getAuth()
        if (auth?.token) {
          setEmployee(auth)
          setIsLogged(true)
          setIsAdmin(auth.employee_role === 3)
        }
        navigate('/')
      }
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <div className="home-page login-page">
      <section className="login-section">
        <h1>
          Login to your account{" "}
          <span style={{ color: "rgb(255, 132, 0)" }}>__</span>
        </h1>

        {serverError && <p className="server-error">{serverError}</p>}

        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="email"></label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={employee_email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <label htmlFor="password"></label>
          <input
            id="password"
            type="password"
            placeholder="password"
            value={employee_password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </section>
    </div>
  );
}
