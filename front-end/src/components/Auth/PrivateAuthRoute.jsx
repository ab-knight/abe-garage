import { useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import { getAuth } from '../../util/auth'

// Wraps a route: logged-out → /login, wrong role → /unauthorized
export default function PrivateAuthRoute({ roles, children }) {
  const check = useMemo(() => {
    const auth = getAuth()
    if (!auth?.token) return { isLogged: false, isAuthorized: false }
    return { isLogged: true, isAuthorized: roles.includes(auth.employee_role) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!check.isLogged) return <Navigate to="/login" replace />
  if (!check.isAuthorized) return <Navigate to="/unauthorized" replace />
  return children
}
