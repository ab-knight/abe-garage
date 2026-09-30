// Vehicle API calls (managers and admins)
const apiUrl = import.meta.env.VITE_API_URL

export async function createVehicle(formData, token) {
  const res = await fetch(`${apiUrl}/vehicle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(formData),
  })
  return res.json()
}

export async function getVehiclesByCustomer(customerId, token) {
  const res = await fetch(`${apiUrl}/customer/${customerId}/vehicles`, {
    headers: { 'x-access-token': token },
  })
  return res.json()
}
