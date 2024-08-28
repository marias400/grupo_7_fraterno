async function rememberUserMiddleware(req, res, next) {
  if (req.cookies && req.cookies.remember !== undefined && req.session.user === undefined) {
    let Users = await datasource.loadUsers();
    let errors = validationResult(req);

    let userFind = Users.find((u) => u.email === req.cookies.remember);
    if (userFind) {
      req.session.user = {
        id: userFind.id,
        firstName: userFind.firstName,
        lastname: userFind.lastName,
        email: userFind.email,
        image: userFind.image,
        admin: userFind.admin,
      };
    } else {
      if (!errors.isEmpty()) {
        res.render("users/log-in", { errors: errors.array() });
      }
    }
  }
  next();
}

module.exports = rememberUserMiddleware;
