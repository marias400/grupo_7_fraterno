const db = require("../database/models");
const bcrypt = require("bcryptjs");

function login(req, res, next) {
  const { email, password } = req.body;

  db.User.findOne({
    where: { email: email },
  })
    .then((user) => {
      if (!user) {
        return res.render("users/log-in", {
          dbErrorEmail: "* El email no se encuentra registrado",
        });
      } else {
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
          return res.render("users/log-in", {
            dbErrorPassword: "* La contraseña es incorrecta",
          });
        }
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    });
}

function editProfile(req, res, next) {
  const { password } = req.body;
  const { email } = res.session.user;

  db.User.findOne({
    where: { email: email },
  })
    .then((user) => {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.render("users/profile/password", {
          error: "* La contraseña es incorrecta",
        });
      }
      next();
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    });
}

module.exports = {
  login,
  editProfile,
};
