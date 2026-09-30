// Order tracking API calls (authenticated users)
const apiUrl = import.meta.env.VITE_API_URL

export async function getOrders(token, limit = 20, customerId = null) {
  let url = `${apiUrl}/orders?limit=${limit}`
  if (customerId) url += `&customer_id=${customerId}`
  const res = await fetch(url, {
    headers: { 'x-access-token': token },
  })
  return res.json()
}

export async function getOrderByHash(hash, token) {
  const res = await fetch(`${apiUrl}/order/${hash}`, {
    headers: token ? { 'x-access-token': token } : {},
  })
  return res.json()
}

export async function updateOrderStatus(order_id, status, token) {
  const res = await fetch(`${apiUrl}/order`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify({ order_id, status }),
  })
  return res.json()
}
