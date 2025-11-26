const getHome = (req, res) => {
  res.render('home.ejs')
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
  getSecrets,
}
