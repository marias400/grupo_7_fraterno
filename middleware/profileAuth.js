function profileAuth(req, res, next) {
  if (req.session.user) {
    res.redirect("/users/profile");
  } else {
    return next();
  }
}

module.exports = profileAuth;
