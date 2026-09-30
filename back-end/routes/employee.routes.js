import { Router } from 'express'
import * as employeeController from '../controllers/employee.controller.js'
import {
  verifyToken,
  isAdmin,
  verifyAdminOrBootstrap,
} from '../middleware/auth.middleware.js'

const router = Router()

// List (limit via ?limit=) — authenticated users
router.get('/employees', verifyToken, employeeController.getAllEmployees)

// Single — authenticated users
router.get('/employee/:id', verifyToken, employeeController.getEmployeeById)

// Create — admins only (open bootstrap when no employees exist yet)
router.post(
  '/employee',
  verifyAdminOrBootstrap,
  employeeController.createEmployee
 )

// Update (id in body, per API design) — admins only
router.put(
  '/employee',
  verifyToken,
  isAdmin,
  employeeController.updateEmployee
)

// Delete — admins only (cannot delete yourself)
router.delete(
  '/employee/:id',
  verifyToken,
  isAdmin,
  employeeController.deleteEmployee
 )

export default router
