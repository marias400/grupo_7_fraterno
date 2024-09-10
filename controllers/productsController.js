const db = require("../database/models");

const productController = {
  inventory: null,

  //pagina: detalle del producto (vista usuario)
  async detailPage(req, res) {
    let { id } = req.params;
    let inventoryItem = db.Product.findByPk(id);
    let products = db.Product.findAll();

    Promise
        .all([products, inventoryItem])
        .then(([products,inventoryItem]) => {
          let ingredients = inventoryItem.ingredients.split(",");
          inventoryItem.ingredients = ingredients;
          console.log(inventoryItem);
          res.render("products/product-detail", { id, inventoryItem,products});
        })
        .catch(error => res.send(error))

  },
   

  //pagina: carrito de compras (vista usuario)
  async cartPage(req, res) {
    res.render("products/product-cart");
  },

  //pagina: lista de productos (vista usuario)
  async listPage(req, res) {
    db.Product.findAll().then((products) => {
      console.log(products);
      res.render("products/product-list", { inventory: products });
      //res.json(products);
    });
  },
};

module.exports = productController;
