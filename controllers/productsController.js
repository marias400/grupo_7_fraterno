const inventoryData = require("../services/inventoryData");

const productController = {
  inventory: null,

  // Crear producto
  async createProduct(req, res) {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},

    // Eliminar producto
    async deleteProduct(req, res) {
        try {
            const deleted = await Product.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.status(204).json();
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

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
