const productController = {
    detailPage: (req, res) => {
        res.render('products/product-detail');
    },

    cartPage: (req, res) => {
        res.render('products/product-cart');
    }
}

module.exports = productController;