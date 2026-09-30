import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrderByHash } from '../services/order.service'

// Public tracking page (no login, no menu link): /order/:orderHash
// The unguessable hash in the URL is the access key.
export default function OrderDetail() {
  const { orderHash } = useParams()
  const [order, setOrder] = useState(null)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    getOrderByHash(orderHash)
      .then((data) => {
        if (data.error) setLoadError(data.error)
        else setOrder(data)
      })
      .catch((err) => setLoadError(err.message))
  }, [orderHash])

  if (loadError) return <p className="server-error">{loadError}</p>
  if (!order) return <p>Loading order...</p>

  const customerName = order.customer
    ? `${order.customer.customer_first_name} ${order.customer.customer_last_name}`
    : '—'

  return (
    <div className="home-page order-page">
      <main className="progress-page">
        <section className="progress-header">
          <div className="title-row">
            <h1>{customerName}</h1>
            <span className="status">{order.status}</span>
          </div>

          <div className="red-line"></div>

          <p>
            You can track the progress of your order using this page.
            We will constantly update this page to let you know how we are progressing.
            As soon as we are done with the order, the status will turn green.
            That means, you car is ready for pickup.
          </p>
        </section>

        {/* Customer and Vehicle Information */}
        <section className="info-container">
          {/* Customer */}
          <div className="info-card">
            <small>CUSTOMER</small>
            <h2>{customerName}</h2>
            <p><strong>Email:</strong> {order.customer?.customer_email}</p>
            <p><strong>Phone Number:</strong> {order.customer?.customer_phone_number}</p>
            <p><strong>Active Customer:</strong> Yes</p>
          </div>

          {/* Vehicle */}
          <div className="info-card">
            <small>CAR IN SERVICE</small>
            <h2>
              {order.vehicle
                ? `${order.vehicle.vehicle_make} ${order.vehicle.vehicle_model} (${order.vehicle.vehicle_color})`
                : 'No vehicle on file'}
            </h2>
            {order.vehicle && (
              <>
                <p><strong>Vehicle tag:</strong> {order.vehicle.vehicle_tag}</p>
                <p><strong>Vehicle year:</strong> {order.vehicle.vehicle_year}</p>
                <p><strong>Vehicle mileage:</strong> {order.vehicle.vehicle_mileage}</p>
              </>
            )}
          </div>
        </section>

        {/* Requested Services */}
        <section className="services-card">
          <div className="service-heading">
            <small>
              {order.vehicle
                ? `${order.vehicle.vehicle_make} ${order.vehicle.vehicle_model}`
                : ''}
            </small>
            <h2>Requested service</h2>
          </div>

          {order.services.map((item) => (
            <div className="service-item" key={item.service_id}>
              <div>
                <h3>{item.service_name}</h3>
                <p>{item.service_description}</p>
              </div>
              <span className="service-status">
                {item.service_completed ? 'Completed' : order.status}
              </span>
            </div>
          ))}

          {order.order_additional_requests && (
            <div className="service-item">
              <div>
                <h3>Additional request</h3>
                <p>{order.order_additional_requests}</p>
              </div>
              <span className="service-status">
                {order.order_additional_requests_completed
                  ? 'Completed'
                  : order.status}
              </span>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
