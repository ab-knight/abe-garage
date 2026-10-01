import * as customerService from '../services/customer.service.js'

// GET /api/customers?limit=20&search=
export async function getAllCustomers(req, res) {
  try {
    const limit = parseInt(req.query.limit, 10) || 20
    const search = (req.query.search || '').trim()
    const customers = await customerService.getAllCustomers(limit, search)
    res.status(200).json({ limit, customers })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET /api/customer/:id
export async function getCustomerById(req, res) {
  try {
    const customer = await customerService.getCustomerById(req.params.id)
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    res.status(200).json(customer)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// POST /api/customer
export async function createCustomer(req, res) {
  try {
    const {
      customer_email,
      customer_phone,
      customer_first_name,
      customer_last_name,
      active_customer,
    } = req.body

    if (!customer_email || !customer_phone || !customer_first_name || !customer_last_name) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (await customerService.customerExists(customer_email, customer_phone)) {
      return res.status(400).json({ error: 'Email or phone already registered' })
    }

    await customerService.createCustomer({
      customer_email,
      customer_phone,
      customer_first_name,
      customer_last_name,
      active_customer,
    })
    res.status(200).json({ success: 'true' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// DELETE /api/customer/:id
export async function deleteCustomer(req, res) {
  try {
    const affected = await customerService.deleteCustomer(req.params.id)
    if (affected === 0) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    res.status(200).json({ success: 'true' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// PUT /api/customer
export async function updateCustomer(req, res) {
  try {
    const {
      customer_id,
      customer_email,
      customer_phone,
      customer_first_name,
      customer_last_name,
      active_customer,
    } = req.body

    if (!customer_id) {
      return res.status(400).json({ error: 'customer_id is required' })
    }

    const affected = await customerService.updateCustomer({
      customer_id,
      customer_email,
      customer_phone,
      customer_first_name,
      customer_last_name,
      active_customer,
    })
    if (affected === 0) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    res.status(200).json({ success: 'true' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
