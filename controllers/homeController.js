let inventory = require('../data/inventory');

const homeController = {

    homePage: (req, res) => {
        res.render('home', {inventory});
    },

    aboutPage: (req, res) => {
        res.render('about-us');
    },
}

module.exports = homeController;