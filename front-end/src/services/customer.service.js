// Customer API calls (managers and admins)
const apiUrl = import.meta.env.VITE_API_URL

function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    'x-access-token': token,
  }
}

export async function getCustomers(token, search = '') {
  const res = await fetch(
    `${apiUrl}/customers?limit=50&search=${encodeURIComponent(search)}`,
    { headers: { 'x-access-token': token } }
  )
  return res.json()
}

export async function getCustomerById(id, token) {
  const res = await fetch(`${apiUrl}/customer/${id}`, {
    headers: { 'x-access-token': token },
  })
  return res.json()
}

export async function createCustomer(formData, token) {
  const res = await fetch(`${apiUrl}/customer`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(formData),
  })
  return res.json()
}

export async function updateCustomer(formData, token) {
  const res = await fetch(`${apiUrl}/customer`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(formData),
  })
  return res.json()
}
