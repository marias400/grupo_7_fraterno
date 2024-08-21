const datasource = require("../services/inventoryData");
const { validationResult } = require("express-validator");

const usersController = {
  async loginPage(req, res) {
    res.render("users/log-in");
  },

  async loginSuccesful(req, res) {
    let { email, password, remember } = req.body;
    let Users = await datasource.loadUsers();
    let errors = validationResult(req);

    let userFind = Users.find((u) => u.email === email);
    if (userFind && userFind.password === password) {
      req.session.user = {
        id: userFind.id,
        firstName: userFind.firstName,
        lastname: userFind.lastName,
        email: userFind.email,
        image: userFind.image,
        admin: userFind.admin,
      };
      if (remember != undefined) {
        res.cookie("remember", req.session.user.email, { maxAge: 60000});
      }
      res.redirect("/home");
    } else {
      if (!errors.isEmpty()) {
        res.render("users/log-in", { errors: errors.array() });
      }
    }
  },

  async registerPage(req, res) {
    res.render("users/register");
  },
  async profilePage(req, res) {
    let msg = null;
    res.render("users/profile", { msg: msg });
  },
};

module.exports = usersController;
