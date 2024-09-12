const db = require('../database/models');
const { Op, Sequelize } = require("sequelize");

const homeController = {
  homePage: async (req, res) => {
    try {
      const bottomSectionRandomSanguches = await pickRandomSanguches(3);
      const topSectionRandomSanguches = await pickRandomSanguches(5);

      async function pickRandomSanguches(amount) {
        const items = await db.Product.findAll({
          order: Sequelize.fn('RAND'),
          limit: amount,
          where: {
            [Op.or]: [{ category: "sanguches" }, { category: "comida" }]
          }
        });
        return items.map(item => item.dataValues);
      }
      res.render("home", {
        products: bottomSectionRandomSanguches,
        topProducts: topSectionRandomSanguches,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error en el servidor");
    }
  },

  aboutPage: (req, res) => {
    res.render("about-us");
  },
};

module.exports = homeController;
