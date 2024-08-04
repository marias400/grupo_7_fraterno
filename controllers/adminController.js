const products = require("../data/products");

const adminController = {
  loginPage: (req, res) => {
    res.render("admin/log-in");
  },

  loginAdmin: (req, res) => {
    let id = 0;
    res.render("admin/product-management", { id, products });
  },

  productManagementPage: (req, res) => {
    const id = req.params.id;
    res.render("admin/product-management", { id, products });
  },

  productEdit: (req, res) => {
    let id = req.body.nigeria;
    id = id - 1;

    console.log(`id: ${id}`);

    res.redirect(`products/${id}`);
  },
};

module.exports = adminController;
