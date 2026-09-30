import { Router } from 'express'
import * as loginController from '../controllers/login.controller.js'

const router = Router()

// Login
router.post('/employee/login', loginController.logIn)

export default router
