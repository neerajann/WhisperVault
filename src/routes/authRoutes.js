import { Router } from 'express'
import passport from 'passport'
import authController from '../controllers/authController.js'
import loginLimit from '../middlewares/loginLimiter.js'

import userController from '../controllers/userController.js'

const router = Router()

router.get('/login', authController.getLogin)

router.post(
  '/login',
  loginLimit,
  passport.authenticate('local', {
    successRedirect: '/secrets',
    failureRedirect: '/login',
    failureFlash: true,
  })
)

router.get('/register', authController.getRegister)

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

export default router
