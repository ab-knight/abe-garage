import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { createCustomer } from '../../services/customer.service'

export default function AddCustomerForm() {
  const { employee } = useAuth()
  const [customer_email, setEmail] = useState('')
  const [customer_first_name, setFirstName] = useState('')
  const [customer_last_name, setLastName] = useState('')
  const [customer_phone, setPhone] = useState('')
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    let valid = true
    if (!customer_email || !customer_first_name || !customer_last_name || !customer_phone) {
      valid = false
    }
    if (!valid) {
      setServerError('All fields are required')
      return
    }

    try {
      const data = await createCustomer(
        { customer_email, customer_first_name, customer_last_name, customer_phone },
        employee?.token
      )
      if (data.error) {
        setServerError(data.error)
        setSuccess(false)
      } else {
        setServerError('')
        setSuccess(true)
        setTimeout(() => navigate('/admin/customers'), 1500)
      }
    } catch (err) {
      setServerError(err.message)
      setSuccess(false)
    }
  }

  return (
    <>
      {serverError && <p className="server-error">{serverError}</p>}
      {success && (
        <p className="server-success">Customer added successfully!</p>
      )}

      <form className="edit-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Customer email"
          value={customer_email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Customer first name"
          value={customer_first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Customer last name"
          value={customer_last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Customer phone (555-555-5555)"
          value={customer_phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit" className="red-btn">
          ADD CUSTOMER
        </button>
      </form>
    </>
  )
}
