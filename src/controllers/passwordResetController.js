import pattern from '../utils/pattern.js'
import resetService from '../services/resetService.js'

const getForgotPassword = (req, res) => {
  const error = req.flash('error')[0] || null
  const success = req.flash('success')[0] || null
  res.render('forgotPassword.ejs', { error: error, success: success })
}

const getVerifyOTP = (req, res) => {
  const error = req.flash('error')[0] || null
  const success = req.flash('success')[0] || null
  res.render('verifyOTP.ejs', { error: error, success: success })
}

const getResetPassword = (req, res) => {
  if (resetService.canReset(req.session)) {
    const error = req.flash('error')[0] || null
    res.render('resetPassword.ejs', { error: error })
  } else {
    req.flash('error', 'You havenot sent password reset request yet')
    return res.redirect('/forgot-password')
  }
}

const verifyOTP = (req, res) => {
  if (!req.session.otp) {
    req.flash('error', 'Bad request')
    return res.redirect('/verify-otp')
  }
  if (!req.body.otp) {
    req.flash('error', 'Please provide otp')
    return res.redirect('/verify-otp')
  }
  const result = resetService.verifyOtp(req.session, req.body.otp)
  if (result.ok) {
    req.flash('success', 'OTP Verified Sucessfully.Redirecting...')
  } else {
    req.flash('error', result.message || 'Invalid OTP')
  }
  return res.redirect('/verify-otp')
}

const resetPassword = async (req, res) => {
  if (!resetService.canReset(req.session)) {
    req.flash('error', 'Your otp hasnot been verified.')
    return res.redirect('/forgot-password')
  }

  if (
    req.body.password?.trim() != req.body.cpassword?.trim() ||
    !req.body.password?.trim() ||
    !req.body.cpassword?.trim()
  ) {
    req.flash('error', 'Password and confirm password must be same.')
    return res.redirect('/reset-password')
  }
  if (!pattern.checkPasswordPattern(req.body.password)) {
    req.flash(
      'error',
      'Password must contain at least 6 characters including uppercase,lowercase,numbers and symbols.'
    )
    return res.redirect('/reset-password')
  }
  try {
    await resetService.resetPassword(req.session, req.body.password)
    req.flash('success', 'Password has been updated.Please procceed to login.')
    res.redirect('/login')
  } catch (error) {
    req.flash('error', 'Something went wrong')
    return res.redirect('/reset-password')
  }
}
export default {
  getForgotPassword,
  getVerifyOTP,
  getResetPassword,
  resetPassword,
  verifyOTP,
}
