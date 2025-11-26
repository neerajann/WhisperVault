import resetService from '../services/resetService.js'
import pattern from '../utils/pattern.js'
import authService from '../services/authService.js'

const sendLoginCode = async (req, res) => {
  if (!req.body.email) {
    req.flash('error', 'Email is required')
    return res.redirect('/forgot-password')
  }
  if (!pattern.checkEmailPattern(req.body.email)) {
    req.flash('error', 'Invalid Email')
    return res.redirect('/forgot-password')
  }
  try {
    const user = await authService.findUser(req.body.email)
    if (!user) {
      req.flash('error', 'User doesnot exist')
      return res.redirect('/forgot-password')
    }

    await resetService.sendOtp(req.session, req.body.email)
    req.flash('success', 'OTP Sent Successfully.Redirecting...')
    res.redirect('/forgot-password')
  } catch (error) {
    console.log(error)
    res.status(500).send('Failed to send the mail')
  }
}

export default { sendLoginCode }
