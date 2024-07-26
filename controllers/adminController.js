const inventory = require("../data/inventory");

const adminController = {
  loginPage: (req, res) => {
    res.render("admin/log-in");
  },

  productManagementPage: (req, res) => {
    const id = req.params.id;
    res.render("admin/product-management", { id, inventory });
  },

  productEdit: (req, res) => {
    let id = req.body.productID;
    id = id - 1;

    console.log(`id: ${id}`);

    res.redirect(`products/${id}`);
  },
};

module.exports = adminController;
