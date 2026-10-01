import { Router } from 'express'
import * as customerController from '../controllers/customer.controller.js'
import {
  verifyToken,
  isManagerOrAdmin,
} from '../middleware/auth.middleware.js'

const router = Router()

// List + search — managers and admins
router.get(
  '/customers',
  verifyToken,
  isManagerOrAdmin,
  customerController.getAllCustomers
)

// Single — managers and admins
router.get(
  '/customer/:id',
  verifyToken,
  isManagerOrAdmin,
  customerController.getCustomerById
)

// Create / update — managers and admins
router.post(
  '/customer',
  verifyToken,
  isManagerOrAdmin,
  customerController.createCustomer
)
router.put(
  '/customer',
  verifyToken,
  isManagerOrAdmin,
  customerController.updateCustomer
)

// Delete — managers and admins
router.delete(
  '/customer/:id',
  verifyToken,
  isManagerOrAdmin,
  customerController.deleteCustomer
)

export default router
