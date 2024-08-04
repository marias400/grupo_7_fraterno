let products = require('../data/products');


const productController = {
    detailPage: (req, res) => {
        res.render('products/product-detail', {id: req.params.id , products: products});
    },

    cartPage: (req, res) => {
        res.render('products/product-cart');
    },
};

module.exports = productController;