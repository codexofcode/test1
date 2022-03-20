import cookieParser from 'cookie-parser'

export const prepareAuth = (secret = process.env.MYSECRET) =>
  cookieParser(secret)

export const authenticate = (onFail, onSuccess) => (req, res) => {
  const { user, pass } = req.body
  const { MYUSER, MYPASS } = process.env

  if (user && user === MYUSER
  &&  pass && pass === MYPASS) {
    res.cookie('isLoggedIn', 'yes', { signed: true })
    onSuccess(res)
  } else {
    onFail(res)
  }
}

export const checkAuth = onFail => (req, res, next) => {
  if (req.signedCookies
  &&  req.signedCookies.isLoggedIn === 'yes')
    next()
  else
    onFail(res)
}
