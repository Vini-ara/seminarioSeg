export const CookieUtils = {
  setHeaderWithCookie(
    res,
    payload,
    maxAge,
  ) {
    Object.entries(payload).map(([key, value]) => {
      res.cookie(key, value, {
        httpOnly: true, // will not allow client-side JavaScript to see the cookie
        maxAge: maxAge * 1000, // convert to milliseconds
        path: '/',
        domain: 'localhost', // change to your domain if needed
        secure: true, // only with https
        sameSite: true,
      })
    })
  },
  getCookieValue(req, key) {
    return req.cookies[key]
  },
  clearCookie(res, key) {
    res.clearCookie(key)
  },
}

