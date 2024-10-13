const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../database/models");
const { where } = require("sequelize");

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
      if (bcrypt.compareSync(password, user.password)) {
        //user && password == user.password
        //bcrypt.compareSync(password, user.password)
        req.session.user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
          phone: user.phone,
          address: user.address,
          admin: user.admin,
        };
        if (remember != undefined) {
          req.session.cookie.maxAge = 31536000000; // 1 año en milisegundos (31536000000 ms)
        }
        db.Cart.findAll({
          include: [
            {
              association: "product",
            },
          ],
          where: {
            users_id: user.id,
          },
        })
          .then((cartItems) => {
            if (cartItems) {
              req.session.cart = {};
            }
            cartItems.forEach((element) => {
              const productName = element.dataValues.product.dataValues.name;
              console.log(productName);
              const randomKey = "id" + Math.random().toString(16).slice(2);
              req.session.cart[randomKey] = productName;
            });
            res.redirect("/home");
          })
          .catch((error) => {
            res.status(500).json({ error: `${error}` });
          });
      } else if (!errors.isEmpty()) {
        res.render("users/log-in", { errors: errors.mapped() });
      }
    });
  },

  async registerPage(req, res) {
    res.render("users/register");
  },

  async supportPage(req, res) {
    let msg = null;
    res.render("users/profile/support", { msg: msg });
  },

  async profilePage(req, res) {
    let msg = null;
    res.render("users/profile/profile", { msg: msg });
  },

  async infoPage(req, res) {
    let msg = null;
    res.render("users/profile/personal-info", { msg: msg });
  },

  async infoUpdate(req, res) {
    const updatedUserInfo = req.body;
    const userInSession = req.session.user;

    if (updatedUserInfo.email === userInSession.email) {
      await db.User.update(
        {
          firstName: updatedUserInfo.firstName,
          lastName: updatedUserInfo.lastName,
          address: updatedUserInfo.address,
          phone: updatedUserInfo.phone,
        },
        {
          where: { email: updatedUserInfo.email },
        }
      );
    }

    db.User.findOne({
      where: { email: updatedUserInfo.email },
    }).then((user) => {
      //user && password == user.password
      //bcrypt.compareSync(password, user.password)
      req.session.user = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        phone: user.phone,
        address: user.address,
        admin: user.admin,
      };
      db.Cart.findAll({
        include: [
          {
            association: "product",
          },
        ],
        where: {
          users_id: user.id,
        },
      })
        .then((cartItems) => {
          if (cartItems) {
            req.session.cart = {};
          }
          cartItems.forEach((element) => {
            const productName = element.dataValues.product.dataValues.name;
            console.log(productName);
            const randomKey = "id" + Math.random().toString(16).slice(2);
            req.session.cart[randomKey] = productName;
          });
          res.redirect("/home");
        })
        .catch((error) => {
          res.status(500).json({ error: `${error}` });
        });
    });
  },

  async ordersPage(req, res) {
    let msg = null;
    res.render("users/profile/order-history", { msg: msg });
  },

  async passwordPage(req, res) {
    let msg = null;
    res.render("users/profile/change-password", { msg: msg });
  },

  async passwordUpdate(req, res) {
    const userInSession = req.session.user;
    if(userInSession){
      const passwordEncypted = bcrypt.hashSync(req.body.password, 10);
      await db.User.update(
        {
          password: passwordEncypted 
        },
        {
          where: { email: userInSession.email },
        }
      );
    }
  },

  async userLogout(req, res) {
    if (req.body.logout) {
      req.session.destroy((err) => {
        if (err) {
          res.render("users/profile/profile", { msg: err });
        }
        res.clearCookie("connect.sid");
        res.redirect("login");
      });
    }
  },

  async processRegister(req, res) {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      let oldData = req.body;
      res.render("users/register", { errors: errors.mapped(), oldData });
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
