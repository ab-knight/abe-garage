// Send new-employee form data to the API (admin token required)
const apiUrl = import.meta.env.VITE_API_URL

export async function createEmployee(formData, token) {
  const res = await fetch(`${apiUrl}/employee`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(formData),
  })
  return res.json()
}

export async function getEmployeeById(id, token) {
  const res = await fetch(`${apiUrl}/employee/${id}`, {
    headers: { 'x-access-token': token },
  })
  return res.json()
}

export async function updateEmployee(formData, token) {
  const res = await fetch(`${apiUrl}/employee`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(formData),
  })
  return res.json()
}

export async function deleteEmployee(id, token) {
  const res = await fetch(`${apiUrl}/employee/${id}`, {
    method: 'DELETE',
    headers: { 'x-access-token': token },
  })
  return res.json()
}

export async function getEmployees(token, limit = 100) {
  const res = await fetch(`${apiUrl}/employees?limit=${limit}`, {
    headers: token ? { 'x-access-token': token } : {},
  })
  return res.json()
}
