let products = require('../data/products');

const homeController = {

    homePage: (req, res) => {
        res.render('home', {products});
    },

    aboutPage: (req, res) => {
        res.render('about-us');
    },
}

module.exports = homeController;