import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from '../../services/service.service'

export default function ServicesManager() {
  const { employee } = useAuth()
  const [services, setServices] = useState([])
  const [service_name, setName] = useState('')
  const [service_description, setDescription] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)

  function loadServices(token) {
    setLoading(true)
    getServices(token)
      .then((data) => {
        if (data.error) setServerError(data.error)
        else setServices(data.services || [])
      })
      .catch((err) => setServerError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    // fetch-on-mount: intentional data load, not a render cascade
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadServices(employee?.token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    let valid = true
    if (!service_name || !service_description) valid = false
    if (!valid) {
      setServerError('Service name and description are required')
      return
    }

    try {
      const data = await createService(
        { service_name, service_description },
        employee?.token
      )
      if (data.error) {
        setServerError(data.error)
        setSuccess(false)
      } else {
        setServerError('')
        setSuccess(true)
        setName('')
        setDescription('')
        loadServices(employee?.token)
      }
    } catch (err) {
      setServerError(err.message)
      setSuccess(false)
    }
  }

  function startEdit(service) {
    setEditingId(service.service_id)
    setEditName(service.service_name)
    setEditDescription(service.service_description)
    setServerError('')
  }

  async function saveEdit(id) {
    try {
      const data = await updateService(
        { service_id: id, service_name: editName, service_description: editDescription },
        employee?.token
      )
      if (data.error) {
        setServerError(data.error)
      } else {
        setEditingId(null)
        loadServices(employee?.token)
      }
    } catch (err) {
      setServerError(err.message)
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete service "${name}"? This cannot be undone.`)) {
      return
    }
    try {
      const data = await deleteService(id, employee?.token)
      if (data.error) {
        setServerError(data.error)
      } else {
        loadServices(employee?.token)
      }
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <>
      {serverError && <p className="server-error">{serverError}</p>}
      {loading && <p>Loading services...</p>}

      {!loading && (
      <div className="service-list">
        {services.map((service) => (
          <div className="service-row" key={service.service_id}>
            {editingId === service.service_id ? (
              <div className="service-edit">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <div>
                  <button className="red-btn" onClick={() => saveEdit(service.service_id)}>
                    SAVE
                  </button>{' '}
                  <button className="ghost-btn" onClick={() => setEditingId(null)}>
                    CANCEL
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h3>{service.service_name}</h3>
                  <p>{service.service_description}</p>
                </div>
                <div className="service-actions">
                  <button className="icon-btn edit" title="Edit service" onClick={() => startEdit(service)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="icon-btn" title="Delete service" onClick={() => handleDelete(service.service_id, service.service_name)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      )}

      <div className="service-add-panel">
        <h2>
          Add a new service <span className="red-line-admin"></span>
        </h2>

        {success && (
          <p className="server-success">Service added successfully!</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Service name"
            value={service_name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Service description"
            value={service_description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit" className="red-btn">
            ADD SERVICE
          </button>
        </form>
      </div>
    </>
  )
}
