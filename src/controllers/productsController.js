const db = require("../database/models");

const productController = {
  inventory: null,

  //pagina: detalle del producto (vista usuario)
  async detailPage(req, res) {
    let { id } = req.params;
    let inventoryItem = db.Product.findByPk(id);
    let products = db.Product.findAll();

    Promise.all([products, inventoryItem])
      .then(([products, inventoryItem]) => {
        let product = inventoryItem.dataValues;
        let ingredients = product.ingredients.split(",");
        product.ingredients = ingredients;
        console.log(product);
        res.render("products/product-detail", {
          id,
          inventoryItem: product,
          products,
        });
      })
      .catch((error) => res.send(error));
  },

  //pagina: lista de productos (vista usuario)
  async listPage(req, res) {
    db.Product.findAll().then((products) => {
      // console.log(products);
      res.render("products/product-list", { inventory: products });
      //res.json(products);
    });
  },
};

module.exports = productController;
