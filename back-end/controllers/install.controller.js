import * as installService from '../services/install.service.js'

export async function runInstall(req, res) {
  const result = await installService.run()

  if (result.success) {
    return res.status(200).json({ success: true, message: result.message })
  }

  return res.status(500).json({ success: false, message: result.message })
}