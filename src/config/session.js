import session from 'express-session'
import MongoStore from 'connect-mongo'
import env from 'dotenv'

env.config()

export default session({
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/secrets',
    collectionName: 'sessions',
    ttl: 60 * 60 * 24,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
})
