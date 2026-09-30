// Service catalog API calls (admin token required)
const apiUrl = import.meta.env.VITE_API_URL

function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    'x-access-token': token,
  }
}

export async function getServices(token) {
  const res = await fetch(`${apiUrl}/services`, {
    headers: token ? { 'x-access-token': token } : {},
  })
  return res.json()
}

export async function createService(formData, token) {
  const res = await fetch(`${apiUrl}/service`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(formData),
  })
  return res.json()
}

export async function updateService(formData, token) {
  const res = await fetch(`${apiUrl}/service`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(formData),
  })
  return res.json()
}

export async function deleteService(id, token) {
  const res = await fetch(`${apiUrl}/service/${id}`, {
    method: 'DELETE',
    headers: { 'x-access-token': token },
  })
  return res.json()
}
