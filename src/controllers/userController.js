const getHome = (req, res) => {
  res.render('home.ejs')
}

const getLogin = (req, res) => {
  const success = req.flash('success')[0] || null
  const error = req.flash('error')[0] || null
  res.render('login.ejs', { error: error, success: success })
}

const getRegister = (req, res) => {
  const error = req.flash('error')
  res.render('register.ejs', { error: error })
}

const getSecrets = (req, res) => {
  if (req.isAuthenticated()) {
    res.render('secrets.ejs')
  } else {
    res.redirect('/login')
  }
}

export default {
  getHome,
  getLogin,
  getRegister,
  getSecrets,
}
