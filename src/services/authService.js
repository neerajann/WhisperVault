import bcrypt from 'bcrypt'
import { User } from '../models/user.js'

const registerUser = async (email, password) => {
  try {
    const hash = await bcrypt.hash(password, 10)
    const newUser = new User({
      email: email,
      password: hash,
    })
    const result = await newUser.save()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const handleGoogleLogin = async (profile) => {
  const result = await User.findOne({
    email: profile.email,
  })
  if (!result) {
    const newUser = new User({
      email: profile.email,
      password: 'google',
    })
    const storedUser = await newUser.save()
    return storedUser._id.toString()
  } else {
    return result._id.toString()
  }
}

const handleLocalLogin = async (username, password) => {
  const result = await User.findOne({
    email: username,
  })
  if (result) {
    const storedHashedPassword = result.password
    if (storedHashedPassword === 'google')
      throw new Error('User doesnot have password. Please login via OAuth')

    const valid = await bcrypt.compare(password, storedHashedPassword)
    if (valid) {
      return result._id.toString()
    } else {
      throw new Error('Invalid Password.')
    }
  } else {
    throw new Error('User not found.')
  }
}

const findUser = async (email) => {
  const user = await User.findOne({
    email: email,
  })
  if (user) return user
  else return null
}

const updateUser = async (email, password) => {
  try {
    const hash = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate({ email: email }, { $set: { password: hash } })
    return true
  } catch (error) {
    throw new Error(error)
  }
}

export default {
  registerUser,
  handleGoogleLogin,
  handleLocalLogin,
  findUser,
  updateUser,
}
