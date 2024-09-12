function userInctiveAuth(req, res, next) {
  if (!req.session.user) {
    return next();
  } else {
    res.redirect("/users/login");
  }
}

function userActiveAuth(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    res.redirect("/users/login");
  }
}

function profileAuth(req, res, next) {
  if (req.session.user) {
    res.redirect("/users/profile");
  } else {
    return next();
  }
}

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

module.exports = {
    userInctiveAuth,
    userActiveAuth,
    profileAuth,
    adminAuth
}