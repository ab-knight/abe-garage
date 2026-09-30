import { createContext, useContext, useState } from 'react'
import { getAuth } from '../util/auth'

// The context object
const AuthContext = createContext(null)

// Read stored auth once, synchronously — no effect, no extra render
function readStoredAuth() {
  const auth = getAuth()
  if (auth?.token) {
    return {
      employee: auth,
      isLogged: true,
      isAdmin: auth.employee_role === 3,
    }
  }
  return { employee: null, isLogged: false, isAdmin: false }
}

// Provider: wrap the app with this to share auth data everywhere
export function AuthProvider({ children }) {
  const [initial] = useState(readStoredAuth)
  const [employee, setEmployee] = useState(initial.employee)
  const [isLogged, setIsLogged] = useState(initial.isLogged)
  const [isAdmin, setIsAdmin] = useState(initial.isAdmin)

  return (
    <AuthContext.Provider
      value={{ employee, setEmployee, isLogged, setIsLogged, isAdmin, setIsAdmin }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook: cleaner than calling useContext(AuthContext) in every component
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
