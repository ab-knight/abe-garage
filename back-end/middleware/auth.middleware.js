import 'dotenv/config'
import jwt from 'jsonwebtoken'

// Verify the JWT sent in the x-access-token header.
// On success, attaches the decoded payload to req.employee.
export function verifyToken(req, res, next) {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: no token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.employee = decoded
    next()
  } catch {
    return res.status(401).json({ error: 'Unauthorized: invalid token' })
  }
}

// Allow only admins (role 3). Use after verifyToken.
export function isAdmin(req, res, next) {
  if (req.employee?.employee_role === 3) {
    return next()
  }
  return res.status(403).json({ error: 'Not an Admin!' })
}

// Like verifyToken + isAdmin in one, but skips auth entirely when the
// employee table is empty (fresh install bootstrap: someone must
// create the first admin).
export async function verifyAdminOrBootstrap(req, res, next) {
  try {
    const pool = (await import('../config/db.config.js')).default
    const [[row]] = await pool.query('SELECT COUNT(*) AS n FROM employee')
    if (row.n === 0) return next()
  } catch {
    return res.status(500).json({ error: 'Database unavailable' })
  }

  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: no token provided' })
  }
  try {
    req.employee = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return res.status(401).json({ error: 'Unauthorized: invalid token' })
  }
  if (req.employee?.employee_role === 3) return next()
  return res.status(403).json({ error: 'Not an Admin!' })
}

// Allow managers (2) and admins (3). Use after verifyToken.
export function isManagerOrAdmin(req, res, next) {
  if ([2, 3].includes(req.employee?.employee_role)) {
    return next()
  }
  return res.status(403).json({ error: 'Managers and Admins only!' })
}
