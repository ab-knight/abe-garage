import * as orderService from '../services/order.service.js'
import { sendOrderTrackingEmail } from '../utils/mailer.js'

// GET /api/orders?limit=20&customer_id=
export async function getAllOrders(req, res) {
  try {
    const limit = parseInt(req.query.limit, 10) || 20
    const customer_id = req.query.customer_id
      ? parseInt(req.query.customer_id, 10)
      : null
    const orders = await orderService.getAllOrders(limit, customer_id)
    res.status(200).json({ limit, orders })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET /api/order/:hash
export async function getOrderByHash(req, res) {
  try {
    const order = await orderService.getOrderByHash(req.params.hash)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.status(200).json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// POST /api/order
export async function createOrder(req, res) {
  try {
    const {
      customer_id,
      employee_id,
      service_ids,
      order_total_price,
      order_estimated_completion_date,
      order_additional_requests,
    } = req.body

    if (!customer_id || !employee_id || !service_ids) {
      return res.status(400).json({
        error: 'customer_id, employee_id and service_ids are required',
      })
    }

    const result = await orderService.createOrder({
      customer_id,
      employee_id,
      service_ids,
      order_total_price,
      order_estimated_completion_date,
      order_additional_requests,
    })

    // Email the tracking link. Never fail the order if mail is down.
    try {
      const email = await orderService.getCustomerEmail(customer_id)
      if (email) await sendOrderTrackingEmail(email, result.order_hash)
    } catch (mailErr) {
      console.error('Tracking email failed:', mailErr.message)
    }

    res.status(200).json({ success: 'true', ...result })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// PUT /api/order  { order_id, status }
export async function updateOrder(req, res) {
  try {
    const { order_id, status } = req.body
    if (!order_id || status === undefined) {
      return res.status(400).json({ error: 'order_id and status are required' })
    }
    const affected = await orderService.updateOrderStatus(order_id, status)
    if (affected === 0) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.status(200).json({ success: 'true' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
