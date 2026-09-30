import { Router } from 'express'
import * as vechileController from '../controllers/vechile.controller.js'
import {
  verifyToken,
  isManagerOrAdmin,
} from '../middleware/auth.middleware.js'

const router = Router()

// Vehicles of a customer — managers and admins
router.get(
  '/customer/:id/vehicles',
  verifyToken,
  isManagerOrAdmin,
  vechileController.getVehiclesByCustomer
)

// Add a vehicle — managers and admins
router.post(
  '/vehicle',
  verifyToken,
  isManagerOrAdmin,
  vechileController.createVehicle
)

export default router
