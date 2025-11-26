import { rateLimit } from 'express-rate-limit'

const loginLimit = rateLimit({
  windowMs: 1000 * 60,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many request. Try again later.',
})

export default loginLimit
