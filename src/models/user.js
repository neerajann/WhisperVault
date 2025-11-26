import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  secret: mongoose.Schema.Types.String,
})

export const User = mongoose.model('User', userSchema)
