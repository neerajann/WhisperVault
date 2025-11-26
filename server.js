import express from 'express'
import passport from 'passport'
import connectDB from './src/config/db.js'
import session from './src/config/session.js'
import initPassport from './src/config/passport.js'
import router from './src/routes/index.js'
import verifySession from './src/middlewares/sessionVerifier.js'
import flash from 'connect-flash'
const app = express()
const port = 3000

await connectDB()

app.use(session)
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(passport.initialize())
app.use(passport.session())

initPassport()

app.use(flash())
app.use(verifySession)
app.use(router)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
