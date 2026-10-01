import { Router } from 'express'
import * as loginController from '../controllers/login.controller.js'
import { loginRateLimit } from '../middleware/auth.middleware.js'

const router = Router()

// Login (rate limited: 5 attempts per 15 min)
router.post('/employee/login', loginRateLimit, loginController.logIn)

export default router
