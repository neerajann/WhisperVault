import mailController from '../controllers/mailController.js'
import { Router } from 'express'
import loginLimit from '../middlewares/loginLimiter.js'

const router = Router()

router.post('/get-otp', loginLimit, mailController.sendLoginCode)

export default router
