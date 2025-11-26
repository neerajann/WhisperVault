import passport from 'passport'
import env from 'dotenv'
import GoogleStrategy from 'passport-google-oauth2'
import { Strategy } from 'passport-local'
import authService from '../services/authService.js'
import { User } from '../models/user.js'

env.config()

const initPassport = () => {
  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/secrets',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await authService.handleGoogleLogin(profile)
          done(null, user)
        } catch (error) {
          done(null, false, { message: error.message })
        }
      }
    )
  )

  passport.use(
    'local',
    new Strategy(async function verify(username, password, cb) {
      try {
        const user = await authService.handleLocalLogin(username, password)
        cb(null, user)
      } catch (error) {
        cb(null, false, { message: error.message })
      }
    })
  )

  passport.serializeUser((user, cb) => {
    const id = typeof user === 'string' ? user : user._id?.toString()
    cb(null, id)
  })

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.findById(id)
      if (!user) return cb(null, null)
      cb(null, user)
    } catch (error) {
      console.log(error)
    }
  })
}

export default initPassport
