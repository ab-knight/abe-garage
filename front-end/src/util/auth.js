// Decode the payload part of a JWT (same as viewing it on jwt.io)
export function decodeTokenPayload(token) {
  const base64 = token.split('.')[1]
  return JSON.parse(
    decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
  )
}

// Read the logged-in employee from the browser's local storage.
// Returns null when nobody is logged in (or data is corrupt).
export function getAuth() {
  try {
    const stored = localStorage.getItem('employee')
    if (!stored) return null

    const data = JSON.parse(stored)
    if (!data?.token) return null

    const decoded = decodeTokenPayload(data.token)
    return { token: data.token, ...decoded }
  } catch {
    return null
  }
}
