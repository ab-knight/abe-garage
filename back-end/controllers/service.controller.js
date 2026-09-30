import * as serviceService from '../services/service.service.js'

// GET /api/services
export async function getAllServices(req, res) {
  try {
    const services = await serviceService.getAllServices()
    res.status(200).json({ services })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// POST /api/service
export async function createService(req, res) {
  try {
    const { service_name, service_description } = req.body

    if (!service_name || !service_description) {
      return res
        .status(400)
        .json({ error: 'Service name and description are required' })
    }

    if (await serviceService.serviceNameExists(service_name)) {
      return res.status(400).json({ error: 'Service already exists' })
    }

    await serviceService.createService({ service_name, service_description })
    res.status(200).json({ success: 'true' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// PUT /api/service
export async function updateService(req, res) {
  try {
    const { service_id, service_name, service_description } = req.body
    if (!service_id) {
      return res.status(400).json({ error: 'service_id is required' })
    }
    const affected = await serviceService.updateService({
      service_id,
      service_name,
      service_description,
    })
    if (affected === 0) {
      return res.status(404).json({ error: 'Service not found' })
    }
    res.status(200).json({ success: 'true' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// DELETE /api/service/:id
export async function deleteService(req, res) {
  try {
    const result = await serviceService.deleteService(req.params.id)
    if (result.inUse) {
      return res.status(400).json({
        error: `Cannot delete: used by ${result.inUse} order(s)`,
      })
    }
    if (!result.deleted) {
      return res.status(404).json({ error: 'Service not found' })
    }
    res.status(200).json({ success: 'true' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
