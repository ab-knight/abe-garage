import * as installService from '../services/install.service.js'

export async function runInstall(req, res) {
  // Only allow install when explicitly enabled via env var
  if (process.env.ALLOW_INSTALL !== 'true') {
    return res.status(403).json({
      success: false,
      message: 'Install endpoint disabled. Set ALLOW_INSTALL=true to enable.'
    })
  }

  const result = await installService.run()

  if (result.success) {
    return res.status(200).json({ success: true, message: result.message })
  }

  return res.status(500).json({ success: false, message: result.message })
}