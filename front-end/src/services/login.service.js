// Send login form data to the API
const apiUrl = import.meta.env.VITE_API_URL

export async function logIn(formData) {
  const res = await fetch(`${apiUrl}/employee/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  return res.json()
}

// Clear the logged-in user from the browser
export function logOut() {
  localStorage.removeItem('employee')
}
