let inventory = require("../data/inventory");

const productController = {
  detailPage: (req, res) => {
    res.render("products/product-detail", { id: req.params.id, inventory });
  },

  cartPage: (req, res) => {
    res.render("products/product-cart");
  },

  listPage: (req, res) => {
    res.render("products/product-list", { inventory });
  },
};

module.exports = productController;
