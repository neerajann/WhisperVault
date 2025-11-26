import authService from '../services/authService.js'
import pattern from '../utils/pattern.js'

const register = async (req, res) => {
  const email = req.body?.username?.trim()
  const password = req.body?.password?.trim()

  if (!email || !password) {
    req.flash('error', 'Missing username or password')
    return res.redirect('/register')
  }
  if (!pattern.checkEmailPattern(email)) {
    req.flash('error', 'Invalid email')
    return res.redirect('/register')
  }
  if (!pattern.checkPasswordPattern(password)) {
    req.flash(
      'error',
      'Password must contain at least 6 characters including uppercase,lowercase,numbers and symbols.'
    )
    return res.redirect('/register')
  }

  try {
    const newUser = await authService.registerUser(email, password)
    req.login(newUser._id.toString(), (err) => {
      res.redirect('/secrets')
    })
  } catch (err) {
    req.flash('error', 'User already exist.')
    return res.redirect('/register')
  }
}

const logOut = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.send('Something went wrong.')
    }
    res.redirect('/')
  })
}

export default { register, logOut }
