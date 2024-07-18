let inventory = require('../data/inventory');


const productController = {
    detailPage: (req, res) => {
        res.render('products/product-detail', {id: req.params.id , inventory: inventory});
    },

    cartPage: (req, res) => {
        res.render('products/product-cart');
    },
};

module.exports = productController;