function adminAuth(req, res, next) {
  if (req.session.user) {
    if (req.session.user.admin == 1) {
      return next();
    } else {
      res.render("users/profile", {msg: "No tiene los permisos suficientes"});
    }
  } else {
    res.redirect("/users/login");
  }
}

module.exports = adminAuth;
