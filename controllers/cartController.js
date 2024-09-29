const { Op } = require("sequelize");
const db = require("../database/models");

const cartController = {
  // test(req, res) {
  //   db.Cart.findAll({
  //     include: [
  //       {
  //         association: "user",
  //         attributes: { exclude: ["password"] },
  //       },
  //       {
  //         association: "product",
  //       },
  //     ],
  //   })
  //     .then((cart) => {
  //       res.status(200).json(cart);
  //     })
  //     .catch((error) => {
  //       res.status(500).json({ error: `${error}` });
  //     });
  // },

  cartAddItem(req, res) {
    let cartContent = req.body;
    req.session.cart = cartContent;

    //forzar a la sesion a guardarse, por que al ser uan peticion POST
    //no lo hace automaticamente (tarde demasiado en darme cuenta T.T)

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
