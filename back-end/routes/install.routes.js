import { Router } from 'express'

import * as installController from '../controllers/install.controller.js'

const router = Router()

router.post('/install', installController.runInstall)

export default router