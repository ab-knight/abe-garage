import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getCustomerById, updateCustomer } from '../../services/customer.service'

export default function EditCustomerForm() {
  const { id } = useParams()
  const { employee } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [active_customer, setActive] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    getCustomerById(id, employee?.token)
      .then((data) => {
        if (data.error) {
          setServerError(data.error)
        } else {
          setEmail(data.customer_email || '')
          setFirstName(data.customer_first_name || '')
          setLastName(data.customer_last_name || '')
          setPhone(data.customer_phone || '')
          setActive(!!data.active_customer)
          setLoaded(true)
        }
      })
      .catch((err) => setServerError(err.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()

    let valid = true
    if (!email || !firstName || !lastName || !phone) valid = false
    if (!valid) {
      setServerError('Email, first name, last name and phone are required')
      return
    }

    try {
      const data = await updateCustomer(
        {
          customer_id: Number(id),
          customer_email: email,
          customer_first_name: firstName,
          customer_last_name: lastName,
          customer_phone: phone,
          active_customer: active_customer ? 1 : 0,
        },
        employee?.token
      )
      if (data.error) {
        setServerError(data.error)
        setSuccess(false)
      } else {
        setServerError('')
        setSuccess(true)
        setTimeout(() => navigate(`/admin/customer/${id}`), 1500)
      }
    } catch (err) {
      setServerError(err.message)
      setSuccess(false)
    }
  }

  return (
    <>
      <h1>
        Edit: {firstName} {lastName}{' '}
        <span className="red-line-admin"></span>
      </h1>

      {serverError && <p className="server-error">{serverError}</p>}
      {success && (
        <p className="server-success">Customer updated successfully!</p>
      )}

      {!loaded && !serverError && <p>Loading customer...</p>}

      {loaded && (
        <form className="edit-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            required
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
          />

          <label className="active-check">
            <input
              type="checkbox"
              checked={active_customer}
              onChange={(e) => setActive(e.target.checked)}
            />
            Is active customer
          </label>

          <button type="submit" className="red-btn">
            UPDATE
          </button>
        </form>
      )}
    </>
  )
}
