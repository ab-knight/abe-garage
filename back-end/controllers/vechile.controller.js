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
