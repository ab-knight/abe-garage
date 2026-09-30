import { Router } from 'express'
import * as serviceController from '../controllers/service.controller.js'
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js'

const router = Router()

// List — PUBLIC (service catalog shown on the public site;
// the order page calls it with a token, which is also fine)
router.get('/services', serviceController.getAllServices)

// Create — admins only
router.post(
  '/service',
  verifyToken,
  isAdmin,
  serviceController.createService
)

// Update — admins only
router.put(
  '/service',
  verifyToken,
  isAdmin,
  serviceController.updateService
)

// Delete — admins only (blocked when used by orders)
router.delete(
  '/service/:id',
  verifyToken,
  isAdmin,
  serviceController.deleteService
)

export default router
