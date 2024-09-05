const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require('../database/models');

const usersController = {
  async loginPage(req, res) {
    res.render("users/log-in");
  },

  async loginSuccesful(req, res) {
    const { email, password, remember } = req.body;
    const errors = validationResult(req);

    db.User.findOne({
      where: { email: email },
    })
    .then((user) => {
      if (user && password == user.password) {        //bcrypt.compareSync(password, user.password)
        req.session.user = {
          id: user.id,
          firstName: user.firstName,
          lastname: user.lastName,
          email: user.email,
          image: user.image,
          admin: user.admin,
        };
        if (remember != undefined) {
          res.cookie("remember", req.session.user.email, { maxAge: 60000 });
        }
        console.log(req.session.user);
        res.redirect("/home");
      } else {
        if (!errors.isEmpty()) {
          res.render("users/log-in", { errors: errors.array() });
        }
      }
    });
  },

  async registerPage(req, res) {
    res.render("users/register");
  },
  async profilePage(req, res) {
    let msg = null;
    res.render("users/profile", { msg: msg });
  },

  async processRegister(req, res) {
    if (req.file) {
      imageFile = `/images/users/${req.file.filename}`;
    } else {
      imageFile = "/images/users/G7favicon.svg";
    }
    passwordEncypted = bcrypt.hashSync(req.body.password, 10);
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      image: imageFile,
      password: passwordEncypted,
    }).then(res.redirect("/"));
  },
};

module.exports = usersController;
