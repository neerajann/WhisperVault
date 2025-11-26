import mailService from './mailService.js'
import generateOTP from '../utils/generateOTP.js'
import authService from './authService.js'

const OTP_TTL_MS = 10 * 60 * 1000
const MAX_ATTEMPTS = 3

const sendOtp = async (session, email) => {
  if (!session || !email) throw new Error('session and email required')

  const otp = generateOTP()
  await mailService(email, otp)

  session.otpRequester = email
  session.otp = otp
  session.otpVerified = false
  session.otpExpiry = Date.now() + OTP_TTL_MS
  session.otpAttempt = 0

  return true
}

const verifyOtp = (session, candidateOtp) => {
  if (!session || !session.otp) return { ok: false, message: 'No OTP pending' }
  if (!candidateOtp) return { ok: false, message: 'No OTP provided' }

  if ((session.otpAttempt || 0) >= MAX_ATTEMPTS) {
    // expire and block
    session.otp = null
    session.otpExpiry = null
    return { ok: false, message: 'Max attempts exceeded' }
  }

  if (!session.otpExpiry || session.otpExpiry < Date.now()) {
    session.otp = null
    session.otpExpiry = null
    return { ok: false, message: 'OTP expired' }
  }

  if (candidateOtp === session.otp) {
    session.otp = null
    session.otpExpiry = null
    session.otpVerified = true
    return { ok: true }
  }

  session.otpAttempt = (session.otpAttempt || 0) + 1
  return { ok: false, message: 'Invalid OTP' }
}

const canReset = (session) => {
  return !!(session && session.otpVerified && session.otpRequester)
}

const resetPassword = async (session, newPassword) => {
  if (!canReset(session)) {
    throw new Error('OTP not verified or no reset requested')
  }

  await authService.updateUser(session.otpRequester, newPassword)

  session.otpVerified = false
  session.otpRequester = null
  session.otpAttempt = null
  session.otpExpiry = null

  return true
}

export default { sendOtp, verifyOtp, canReset, resetPassword }
