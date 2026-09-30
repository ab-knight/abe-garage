import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getCustomers } from '../../services/customer.service'
import { getServices } from '../../services/service.service'
import { getEmployees } from '../../services/employee.service'

const apiUrl = import.meta.env.VITE_API_URL

export default function NewOrderForm() {
  const { employee } = useAuth()

  const [customerSearch, setCustomerSearch] = useState('')
  const [customerResults, setCustomerResults] = useState([])
  const [customer, setCustomer] = useState(null)

  const [services, setServices] = useState([])
  const [serviceIds, setServiceIds] = useState([])

  const [mechanics, setMechanics] = useState([])
  const [employeeId, setEmployeeId] = useState('')

  const [totalPrice, setTotalPrice] = useState('')
  const [estimatedDate, setEstimatedDate] = useState('')
  const [additionalRequests, setAdditionalRequests] = useState('')

  const [serverError, setServerError] = useState('')
  const [orderHash, setOrderHash] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const token = employee?.token
    getServices(token).then((d) => {
      if (!d.error) setServices(d.services || [])
    })
    getEmployees(token).then((d) => {
      if (!d.error) {
        setMechanics(d.employees || [])
        if (employee?.employee_id) setEmployeeId(String(employee.employee_id))
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleCustomerSearch(e) {
    e.preventDefault()
    const data = await getCustomers(employee?.token, customerSearch.trim())
    if (data.error) setServerError(data.error)
    else setCustomerResults(data.customers || [])
  }

  function toggleService(id) {
    setServiceIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError('')

    if (!customer) {
      setServerError('Select a customer first')
      return
    }
    if (serviceIds.length === 0) {
      setServerError('Select at least one service')
      return
    }
    if (!employeeId) {
      setServerError('Assign a mechanic')
      return
    }

    try {
      const res = await fetch(`${apiUrl}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': employee?.token,
        },
        body: JSON.stringify({
          customer_id: customer.customer_id,
          employee_id: Number(employeeId),
          service_ids: serviceIds,
          order_total_price: totalPrice ? Number(totalPrice) : 0,
          order_estimated_completion_date: estimatedDate || null,
          order_additional_requests: additionalRequests,
        }),
      })
      const data = await res.json()
      if (data.error) {
        setServerError(data.error)
      } else {
        setOrderHash(data.order_hash)
      }
    } catch (err) {
      setServerError(err.message)
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(
      `${window.location.origin}/order/${orderHash}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function reset() {
    setCustomer(null)
    setCustomerSearch('')
    setCustomerResults([])
    setServiceIds([])
    setTotalPrice('')
    setEstimatedDate('')
    setAdditionalRequests('')
    setOrderHash('')
    setServerError('')
  }

  if (orderHash) {
    return (
      <div className="white-card padded">
        <p className="server-success">Order created successfully!</p>
        <p>
          Tracking link:{' '}
          <Link to={`/order/${orderHash}`}>
            {window.location.origin}/order/{orderHash}
          </Link>
        </p>
        <p>
          <button className="red-btn" onClick={copyLink}>
            {copied ? 'COPIED!' : 'COPY LINK'}
          </button>{' '}
          <button className="ghost-btn" onClick={reset}>
            NEW ORDER
          </button>
        </p>
      </div>
    )
  }

  return (
    <>
      {serverError && <p className="server-error">{serverError}</p>}

      <form className="edit-form" onSubmit={handleSubmit}>
        <h3>1. Customer</h3>
        {customer ? (
          <p>
            <strong>
              {customer.customer_first_name} {customer.customer_last_name}
            </strong>{' '}
            ({customer.customer_email}){' '}
            <button
              type="button"
              className="ghost-btn"
              onClick={() => setCustomer(null)}
            >
              CHANGE
            </button>
          </p>
        ) : (
          <>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search customer by name, email or phone"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
              />
              <button className='searchmag' type="button" title="Search" onClick={handleCustomerSearch}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            {customerResults.map((c) => (
              <div className="vehicle-row" key={c.customer_id}>
                <strong>
                  {c.customer_first_name} {c.customer_last_name}
                </strong>
                <span>{c.customer_email}</span>
                <button
                  type="button"
                  className="red-btn"
                  onClick={() => {
                    setCustomer(c)
                    setCustomerResults([])
                  }}
                >
                  SELECT
                </button>
              </div>
            ))}
          </>
        )}

        <h3>2. Services</h3>
        {services.map((s) => (
          <label className="check-row" key={s.service_id}>
            <input
              type="checkbox"
              checked={serviceIds.includes(s.service_id)}
              onChange={() => toggleService(s.service_id)}
            />
            <strong>{s.service_name}</strong>
            <span className="muted">{s.service_description}</span>
          </label>
        ))}

        <h3>3. Mechanic</h3>
        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        >
          <option value="">Select mechanic</option>
          {mechanics.map((m) => (
            <option key={m.employee_id} value={m.employee_id}>
              {m.employee_first_name} {m.employee_last_name} ({m.employee_email})
            </option>
          ))}
        </select>

        <h3>4. Details</h3>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Total price"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
        />
        <input
          type="datetime-local"
          value={estimatedDate}
          onChange={(e) => setEstimatedDate(e.target.value)}
        />
        <textarea
          placeholder="Additional requests"
          value={additionalRequests}
          onChange={(e) => setAdditionalRequests(e.target.value)}
        />

        <button type="submit" className="red-btn">
          CREATE ORDER
        </button>
      </form>
    </>
  )
}
