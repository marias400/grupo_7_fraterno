const inventoryData = require("../services/inventoryData");

const productController = {
  inventory: null,

  //pagina: detalle del producto (vista usuario)
  async detailPage(req, res) {
    this.inventory = await inventoryData.load();
    let { id } = req.params;

    const inventoryItem = this.inventory.find((item) => {
      return item.id === id;
    });

    res.render("products/product-detail", { id, inventoryItem });
  },

  //pagina: carrito de compras (vista usuario)
  async cartPage(req, res) {
    res.render("products/product-cart");
  },

  //pagina: lista de productos (vista usuario)
  async listPage(req, res) {
    this.inventory = await inventoryData.load();
    res.render("products/product-list", { inventory });
  },
};

module.exports = productController;
