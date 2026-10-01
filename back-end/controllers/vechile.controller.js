import * as vechileService from '../services/vechile.service.js'

// POST /api/vehicle
export async function createVehicle(req, res) {
  try {
    const result = await vechileService.createVehicle(req.body)
    res.status(200).json({ success: 'true', ...result })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// GET /api/customer/:id/vehicles
export async function getVehiclesByCustomer(req, res) {
  try {
    const vehicles = await vechileService.getVehiclesByCustomer(req.params.id)
    res.status(200).json({ vehicles })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET /api/vehicle/:id
export async function getVehicleById(req, res) {
  try {
    const vehicle = await vechileService.getVehicleById(req.params.id)
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' })
    }
    res.status(200).json(vehicle)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// PUT /api/vehicle
export async function updateVehicle(req, res) {
  try {
    const { id, ...data } = req.body
    if (!id) {
      return res.status(400).json({ error: 'vehicle_id is required' })
    }
    const affected = await vechileService.updateVehicle(id, data)
    if (affected === 0) {
      return res.status(404).json({ error: 'Vehicle not found' })
    }
    res.status(200).json({ success: 'true' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// DELETE /api/vehicle/:id
export async function deleteVehicle(req, res) {
  try {
    const affected = await vechileService.deleteVehicle(req.params.id)
    if (affected === 0) {
      return res.status(404).json({ error: 'Vehicle not found' })
    }
    res.status(200).json({ success: 'true' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
