import { Router } from 'express'
import passwordResetController from '../controllers/passwordResetController.js'
import authController from '../controllers/authController.js'

const router = Router()

router.get('/logout', authController.logOut)

router.get('/forgot-password', passwordResetController.getForgotPassword)

router.get('/verify-otp', passwordResetController.getVerifyOTP)

router.post('/verify-otp', passwordResetController.verifyOTP)

router.get('/reset-password', passwordResetController.getResetPassword)

router.post('/reset-password', passwordResetController.resetPassword)

export default router
