function sessionMiddleware(req, res, next) {
  res.locals.userSession = req.session.user || null;
  next();
}

module.exports = sessionMiddleware;
