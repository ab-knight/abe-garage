import { Router } from 'express'
import employeeRoutes from './employee.routes.js'
import loginRoutes from './login.routes.js'
import serviceRoutes from './services.routes.js'
import orderRoutes from './order.routes.js'
import customerRoutes from './customer.routes.js'
import vechileRoutes from './vechiles.routes.js'
import installRoutes from './install.routes.js'

const router = Router()

router.use('/api', employeeRoutes)
router.use('/api', loginRoutes)
router.use('/api', serviceRoutes)
router.use('/api', orderRoutes)
router.use('/api', customerRoutes)
router.use('/api', vechileRoutes)
// Fresh-database setup. DESTRUCTIVE (drops + recreates all tables) —
// disable or protect this route once the app is live.
router.use('/api', installRoutes)

export default router
