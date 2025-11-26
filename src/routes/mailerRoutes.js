import mailController from '../controllers/mailController.js'
import { Router } from 'express'
import loginLimit from '../middlewares/loginLimiter.js'

const router = Router()

router.post('/get-login-code', loginLimit, mailController.sendLoginCode)

export default router
