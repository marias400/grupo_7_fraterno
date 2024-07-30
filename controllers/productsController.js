let inventory = require("../data/inventory");

const productController = {

  //pagina: detalle del producto (vista usuario)
  detailPage: (req, res) => {
    let { id } = req.params;

    res.render("products/product-detail", { id, inventory });
  },

  //pagina: carrito de compras (vista usuario)
  cartPage: (req, res) => {
    res.render("products/product-cart");
  },

  //pagina: lista de productos (vista usuario)
  listPage: (req, res) => {
    res.render("products/product-list", { inventory });
  },
};

module.exports = productController;
