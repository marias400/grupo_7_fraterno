const { Op } = require("sequelize");
const db = require("../database/models");

const cartController = {
  cartCheckout(req, res) {
    const user = req.session.user;
    const cartContent = req.session.cart;
    req.session.cart = {};

    if (user) {
      for (const key in cartContent) {
        db.Product.findOne({
          where: {
            name: cartContent[key],
          },
        }).then((product) => {
          const productId = product.dataValues.id;
          const userId = user.id;
          db.Cart.create({
            users_id: userId,
            products_id: productId,
            amount: 1,
          });
        });
      }
      res.redirect("/");
    } else {
      res.redirect("/users/login");
    }
  },

  cartItems(req, res) {
    if (req.session.cart) {
      res.send(req.session.cart);
    } else {
      console.error("no hay naranja en la session");
    }
  },

  cartLength(req, res) {
    const cart = req.session.cart;
    if (cart) {
      const cartLength = Object.keys(cart).length;
      res.send({ cartLength: cartLength });
    } else {
      res.send({ cartLength: null });
    }
  },

  cartAddItem(req, res) {
    if (req.session.cart) {
      const cartContent = req.body;
      for (const key in cartContent) {
        req.session.cart[key] = cartContent[key];
      }
    } else {
      const cartContent = req.body;
      req.session.cart = cartContent;
    }

    //forzar a la sesion a guardarse, por que al ser uan peticion POST
    //no lo hace automaticamente (tarde demasiado en darme cuenta T.T)

    req.session.save((err) => {
      if (err) {
        return res.status(500).send("Error al guardar la sesión.");
      }
      res.send(req.session.cart);
    });
  },

  cartDeleteItem(req, res) {
    if (req.session.cart) {
      const cartContent = req.body;
      for (const key in cartContent) {
        delete req.session.cart[key];
      }
    } else {
      return res
        .status(400)
        .send("No se pudo eliminar, el carrito está vacío.");
    }
    req.session.save((err) => {
      if (err) {
        return res.status(500).send("Error al guardar la sesión.");
      }
      res.send(req.session.cart);
    });
  },

  cartPage(req, res) {
    let cart = req.session.cart;
    let total = 0;

    if (cart) {
      // Crear un array de promesas
      let promises = Object.entries(cart).map(([key, value]) => {
        return db.Product.findOne({
          where: {
            name: {
              [Op.like]: value,
            },
          },
        })
          .then((response) => {
            if (response) {
              let newItem = response.dataValues;
              newItem["uniqueId"] = key;
              total += newItem.price;
              return newItem; // Retornar el producto para después incluirlo en el carrito
            }
          })
          .catch((error) => {
            console.error(error);
            return null; // En caso de error, retornar null o manejar el error adecuadamente
          });
      });

      // Ejecutar todas las promesas en paralelo y luego renderizar
      Promise.all(promises).then((cartContent) => {
        // Filtrar productos null en caso de errores
        cartContent = cartContent.filter((item) => item !== null);

        res.render("products/product-cart", {
          cartContent: cartContent,
          total: total,
        });
      });
    } else {
      res.render("products/product-cart", {
        cartContent: null,
        total: null,
      });
    }
  },
};

module.exports = cartController;
