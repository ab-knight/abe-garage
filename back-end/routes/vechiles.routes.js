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

// Single vehicle — managers and admins
router.get(
  '/vehicle/:id',
  verifyToken,
  isManagerOrAdmin,
  vechileController.getVehicleById
)

// Add a vehicle — managers and admins
router.post(
  '/vehicle',
  verifyToken,
  isManagerOrAdmin,
  vechileController.createVehicle
)

// Update vehicle — managers and admins
router.put(
  '/vehicle',
  verifyToken,
  isManagerOrAdmin,
  vechileController.updateVehicle
)

// Delete vehicle — managers and admins
router.delete(
  '/vehicle/:id',
  verifyToken,
  isManagerOrAdmin,
  vechileController.deleteVehicle
)

export default router
