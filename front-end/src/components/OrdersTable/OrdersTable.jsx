import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getOrders, updateOrderStatus } from '../../services/order.service'
import { formatAddedDate } from '../../util/format'

const STATUSES = ['All', 'Received', 'In Progress', 'Completed']
const ORDER_STATUSES = ['Received', 'In Progress', 'Completed']

export default function OrdersTable() {
  const { isAdmin, employee } = useAuth()
  const canManage = isAdmin || employee?.employee_role === 2
  const [orders, setOrders] = useState([])
  const [statusFilter, setStatusFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  function load() {
    setLoading(true)
    getOrders(employee?.token)
      .then((data) => {
        if (data.error) setLoadError(data.error)
        else setOrders(data.orders || [])
      })
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    // fetch-on-mount: intentional data load, not a render cascade
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleStatusChange(order_id, status) {
    try {
      const data = await updateOrderStatus(
        order_id,
        ORDER_STATUSES.indexOf(status),
        employee?.token
      )
      if (data.error) {
        setLoadError(data.error)
      } else {
        setOrders((prev) =>
          prev.map((o) => (o.order_id === order_id ? { ...o, status } : o))
        )
      }
    } catch (err) {
      setLoadError(err.message)
    }
  }

  const visible =
    statusFilter === 'All'
      ? orders
      : orders.filter((o) => o.status === statusFilter)

  return (
    <>
      <div className="table-toolbar">
        <label>
          Status:{' '}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loadError && <p className="server-error">{loadError}</p>}
      {loading && <p>Loading orders...</p>}

      {!loading && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((order) => (
              <tr key={order.order_id}>
                <td>#{order.order_id}</td>
                <td>
                  {order.customer_first_name} {order.customer_last_name}
                </td>
                <td>{order.customer_email}</td>
                <td>{formatAddedDate(order.order_date)}</td>
                <td>
                  {canManage ? (
                    <select
                      className="status-select"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.order_id, e.target.value)
                      }
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="service-status">{order.status}</span>
                  )}
                </td>
                <td>
                  <Link to={`/order/${order.order_hash}`}>Track</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
