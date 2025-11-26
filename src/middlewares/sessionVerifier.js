const verifySession = (req, res, next) => {
  if (!req.session.initialized) {
    req.session.initialized = true
    req.session.ip = req.ip
    req.session.ua = req.headers['user-agent']
    return next()
  } else {
    if (
      req.session.ip !== req.ip ||
      req.session.ua != req.headers['user-agent']
    ) {
      return req.logOut(() => {
        return req.session.destroy(() => {
          return res.redirect('/')
        })
      })
    }
  }
  return next()
}

export default verifySession
