import { Router } from 'express'
import userController from '../controllers/userController.js'

const router = Router()

router.get('/', userController.getHome)

router.get('/secrets', userController.getSecrets)

export default router
