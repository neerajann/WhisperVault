import authRouter from './authRoutes.js'
import mailRouter from './mailerRoutes.js'
import userRouter from './usersRoutes.js'
import passwordResetRouter from './resetPasswordRoutes.js'
import { Router } from 'express'

const router = Router()
router.use(authRouter)
router.use(userRouter)
router.use(mailRouter)
router.use(passwordResetRouter)

router.use((req, res, next) => {
  res.status(404).render('404.ejs', { url: req.originalUrl })
})

export default router
