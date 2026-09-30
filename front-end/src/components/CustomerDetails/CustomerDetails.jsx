import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getCustomerById } from '../../services/customer.service'
import { createVehicle } from '../../services/vehicle.service'
import { getOrders } from '../../services/order.service'

const EMPTY_VEHICLE = {
  vehicle_year: '',
  vehicle_make: '',
  vehicle_model: '',
  vehicle_type: '',
  vehicle_mileage: '',
  vehicle_tag: '',
  vehicle_serial_number: '',
  vehicle_color: '',
}

export default function CustomerDetails() {
  const { id } = useParams()
  const { employee } = useAuth()
  const [customer, setCustomer] = useState(null)
  const [vehicles, setVehicles] = useState([])
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState(EMPTY_VEHICLE)
  const [showForm, setShowForm] = useState(true)
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)

  function load() {
    // Clear previous customer so we never show stale details
    setCustomer(null)
    setVehicles([])
    setOrders([])
    setServerError('')
    getCustomerById(id, employee?.token)
      .then((data) => {
        if (data.error) {
          setServerError(data.error)
        } else {
          setCustomer(data)
          setVehicles(data.vehicles || [])
        }
      })
      .catch((err) => setServerError(err.message))
    getOrders(employee?.token, 20, id)
      .then((data) => {
        if (!data.error) setOrders(data.orders || [])
      })
      .catch(() => {})
  }

  useEffect(() => {
    // fetch-on-mount: intentional data load, not a render cascade
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  function setField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const required = [
      'vehicle_year',
      'vehicle_make',
      'vehicle_model',
      'vehicle_type',
      'vehicle_tag',
      'vehicle_serial_number',
      'vehicle_color',
    ]
    if (required.some((f) => !form[f])) {
      setServerError('All vehicle fields except mileage are required')
      return
    }

    try {
      const data = await createVehicle(
        {
          customer_id: Number(id),
          vehicle_year: Number(form.vehicle_year),
          vehicle_make: form.vehicle_make,
          vehicle_model: form.vehicle_model,
          vehicle_type: form.vehicle_type,
          vehicle_mileage: form.vehicle_mileage ? Number(form.vehicle_mileage) : null,
          vehicle_tag: form.vehicle_tag,
          vehicle_serial_number: form.vehicle_serial_number,
          vehicle_color: form.vehicle_color,
        },
        employee?.token
      )
      if (data.error) {
        setServerError(data.error)
        setSuccess(false)
      } else {
        setServerError('')
        setSuccess(true)
        setForm(EMPTY_VEHICLE)
        load()
      }
    } catch (err) {
      setServerError(err.message)
      setSuccess(false)
    }
  }

  if (serverError && !customer) {
    return <p className="server-error">{serverError}</p>
  }
  if (!customer) return <p>Loading customer...</p>

  const fullName = `${customer.customer_first_name} ${customer.customer_last_name}`

  return (
    <div className="timeline">
      {/* Info */}
      <section className="timeline-row">
        <div className="timeline-badge">Info</div>
        <div className="timeline-body">
          <h2>Customer: {fullName}</h2>
          <p><strong>Email:</strong> {customer.customer_email}</p>
          <p><strong>Phone Number:</strong> {customer.customer_phone}</p>
          <p><strong>Active Customer:</strong> {customer.active_customer ? 'Yes' : 'No'}</p>
          <p>
            Edit customer info{' '}
            <Link to={`/admin/customer/edit/${customer.customer_id}`} title="Edit customer">
              <i className="fa-solid fa-pen-to-square edit-icon"></i>
            </Link>
          </p>
        </div>
      </section>

      {/* Cars */}
      <section className="timeline-row">
        <div className="timeline-badge">Cars</div>
        <div className="timeline-body">
          <h2>Vehicles of {customer.customer_first_name}</h2>
          <div className="white-card">
            {vehicles.length === 0 ? (
              <p className="muted">No vehicle found</p>
            ) : (
              vehicles.map((v) => (
                <div className="vehicle-row" key={v.vehicle_id}>
                  <strong>
                    {v.vehicle_year} {v.vehicle_make} {v.vehicle_model}
                  </strong>
                  <span>
                    {v.vehicle_color} · {v.vehicle_tag} · {v.vehicle_mileage} mi
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Add vehicle */}
      {!showForm && (
        <button className="red-btn" onClick={() => setShowForm(true)}>
          ADD VEHICLE
        </button>
      )}
      {showForm && (
        <section className="timeline-row">
          <div className="timeline-spacer"></div>
          <div className="timeline-body">
            <div className="white-card padded relative">
              <button
                className="close-btn"
                title="Hide form"
                onClick={() => setShowForm(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <h2>
                Add a new vehicle <span className="red-line-admin"></span>
              </h2>

              {serverError && <p className="server-error">{serverError}</p>}
              {success && (
                <p className="server-success">Vehicle added successfully!</p>
              )}

              <form className="edit-form" onSubmit={handleSubmit}>
                <input type="number" placeholder="Vehicle year" value={form.vehicle_year} onChange={(e) => setField('vehicle_year', e.target.value)} required />
                <input type="text" placeholder="Vehicle make" value={form.vehicle_make} onChange={(e) => setField('vehicle_make', e.target.value)} required />
                <input type="text" placeholder="Vehicle model" value={form.vehicle_model} onChange={(e) => setField('vehicle_model', e.target.value)} required />
                <input type="text" placeholder="Vehicle type" value={form.vehicle_type} onChange={(e) => setField('vehicle_type', e.target.value)} required />
                <input type="number" placeholder="Vehicle mileage" value={form.vehicle_mileage} onChange={(e) => setField('vehicle_mileage', e.target.value)} />
                <input type="text" placeholder="Vehicle tag" value={form.vehicle_tag} onChange={(e) => setField('vehicle_tag', e.target.value)} required />
                <input type="text" placeholder="Vehicle serial" value={form.vehicle_serial_number} onChange={(e) => setField('vehicle_serial_number', e.target.value)} required />
                <input type="text" placeholder="Vehicle color" value={form.vehicle_color} onChange={(e) => setField('vehicle_color', e.target.value)} required />
                <button type="submit" className="red-btn">
                  ADD VEHICLE
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Orders */}
      <section className="timeline-row">
        <div className="timeline-badge">Orders</div>
        <div className="timeline-body">
          <h2>Orders of {customer.customer_first_name}</h2>
          <div className="white-card">
            {orders.length === 0 ? (
              <p className="muted">No orders yet</p>
            ) : (
              orders.map((o) => (
                <div className="vehicle-row" key={o.order_id}>
                  <strong>Order #{o.order_id}</strong>
                  <span>{o.status}</span>
                  <Link to={`/order/${o.order_hash}`}>Track</Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
