import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getCustomers } from '../../services/customer.service'
import { formatAddedDate } from '../../util/format'

const PAGE_SIZE = 10

export default function CustomersTable() {
  const { employee } = useAuth()
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const navigate = useNavigate()

  function load(term) {
    setLoading(true)
    getCustomers(employee?.token, term)
      .then((data) => {
        if (data.error) setLoadError(data.error)
        else {
          setCustomers(data.customers || [])
          setPage(0)
        }
      })
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    // fetch-on-mount: intentional data load, not a render cascade
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    load(search.trim())
  }

  function handleSearchChange(value) {
    setSearch(value)
    if (value === '') load('')
  }

  const pageCount = Math.max(1, Math.ceil(customers.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount - 1)
  const visible = customers.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)

  return (
    <>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a customer using first name, last name, email address or phone number"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <button type="submit" title="Search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      {loadError && <p className="server-error">{loadError}</p>}

      {loading && <p>Loading customers...</p>}

      {!loading && (
      <>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Added Date</th>
            <th>Active</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((cust) => (
            <tr key={cust.customer_id}>
              <td>{cust.customer_id}</td>
              <td>{cust.customer_first_name}</td>
              <td>{cust.customer_last_name}</td>
              <td>{cust.customer_email}</td>
              <td>{cust.customer_phone}</td>
              <td>{formatAddedDate(cust.added_date)}</td>
              <td>{cust.active_customer ? 'Yes' : 'No'}</td>
              <td>
                <button
                  className="icon-btn"
                  title="Edit customer"
                  onClick={() => navigate(`/admin/customer/edit/${cust.customer_id}`)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  className="icon-btn"
                  title="Customer details"
                  onClick={() => navigate(`/admin/customer/${cust.customer_id}`)}
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pageCount > 1 && (
      <div className="pager">
        <button disabled={safePage === 0} onClick={() => setPage(0)}>
          « First
        </button>
        <button disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>
          ‹ Previous
        </button>
        <button
          className="pager-active"
          disabled={safePage >= pageCount - 1}
          onClick={() => setPage(safePage + 1)}
        >
          › Next
        </button>
        <button
          className="pager-active"
          disabled={safePage >= pageCount - 1}
          onClick={() => setPage(pageCount - 1)}
        >
          » Last
        </button>
      </div>
      )}
      </>
      )}
    </>
  )
}
