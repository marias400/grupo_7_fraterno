const homeController = {
    homePage: (req, res) => {
        res.render('home');
    },

    aboutPage: (req, res) => {
        res.render('about-us');
    },
}

module.exports = homeController;