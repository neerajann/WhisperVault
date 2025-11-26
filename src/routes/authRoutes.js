import { Router } from 'express'
import passport from 'passport'
import authController from '../controllers/authController.js'
import loginLimit from '../middlewares/loginLimiter.js'
import passwordResetController from '../controllers/passwordResetController.js'
import userController from '../controllers/userController.js'

const router = Router()

router.get('/login', userController.getLogin)

router.post(
  '/login',
  loginLimit,
  passport.authenticate('local', {
    successRedirect: '/secrets',
    failureRedirect: '/login',
    failureFlash: true,
  })
)

router.get('/register', userController.getRegister)

router.post('/register', authController.register)

router.get(
  '/auth/google/secrets',
  passport.authenticate('google', {
    successRedirect: '/secrets',
    failureRedirect: '/login',
    failureFlash: true,
  })
)

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
)

router.get('/logout', authController.logOut)

router.get('/forgot-password', passwordResetController.getForgotPassword)

router.get('/verify-otp', passwordResetController.getVerifyOTP)

router.post('/verify-otp', passwordResetController.verifyOTP)

router.get('/reset-password', passwordResetController.getResetPassword)

router.post('/reset-password', passwordResetController.resetPassword)

export default router
