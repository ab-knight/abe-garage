import { Router } from 'express'
import * as orderController from '../controllers/order.controller.js'
import {
  verifyToken,
  isManagerOrAdmin,
} from '../middleware/auth.middleware.js'

const router = Router()

// List — any authenticated user
router.get('/orders', verifyToken, orderController.getAllOrders)

// Detail by hash — PUBLIC (customers track via secret link, no login)
router.get('/order/:hash', orderController.getOrderByHash)

// Create / update status — managers and admins
router.post(
  '/order',
  verifyToken,
  isManagerOrAdmin,
  orderController.createOrder
)
router.put(
  '/order',
  verifyToken,
  isManagerOrAdmin,
  orderController.updateOrder
)

export default router
