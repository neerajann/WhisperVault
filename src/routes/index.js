import authRouter from './authRoutes.js'
import mailRouter from './mailerRoutes.js'
import userRouter from './usersRoutes.js'
import { Router } from 'express'

const router = Router()
router.use(authRouter)
router.use(userRouter)
router.use(mailRouter)

router.use((req, res, next) => {
  res
    .status(404)
    .send('404 Not Found: The page you are looking for does not exist.')
})

export default router
