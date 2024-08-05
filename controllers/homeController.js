const pickRandomSanguches = require("../scripts/sanguches-randomizer")


const homeController = {
  homePage: (req, res) => {
    // Pick 3 random "sanguches" every time the route is accessed
    const bottomSectionRandomSanguches = pickRandomSanguches(3);
    // Pick 5 random "sanguches" every time the route is accessed
    const topSectionRandomSanguches = pickRandomSanguches(5);
    res.render("home", {
      products: bottomSectionRandomSanguches,
      topProducts: topSectionRandomSanguches,
    });
  },

  aboutPage: (req, res) => {
    res.render("about-us");
  },
};


module.exports = homeController;
