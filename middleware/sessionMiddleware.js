function sessionMiddleware(req, res, next) {
  res.locals.userSession = req.session.user || null;
  if (req.session.user) {
    res.locals.userSession.isAdmin = req.session.user.admin;
  }
  next();
}

module.exports = sessionMiddleware;
