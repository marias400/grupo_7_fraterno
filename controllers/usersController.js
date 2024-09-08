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
    }).then((user) => {
      if (user && password == user.password) {
        //bcrypt.compareSync(password, user.password)
        req.session.user = {
          id: user.id,
          firstName: user.firstName,
          lastname: user.lastName,
          email: user.email,
          image: user.image,
          admin: user.admin,
        };
        if (remember != undefined) {
          req.session.cookie.maxAge = 31536000000;  // 1 año en milisegundos (31536000000 ms)
        }
        res.redirect("/home");
      } else {
        if (!errors.isEmpty()) {
          res.render("users/log-in", { errors: errors.mapped() });
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

  async userLogout(req, res) {
    if (req.body.logout) {
      req.session.destroy(err => {
        if (err) {
          res.render("users/profile", { msg: err });
        }
        res.clearCookie('connect.sid');
        res.redirect('login');
      });
    }
  },

  async processRegister(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let oldData = req.body     
      res.render("users/register", { errors : errors.mapped(), oldData });
    } else {
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
    }
  },
};

module.exports = usersController;
