const inventory = require("../data/inventory"); // Make sure to import the correct inventory file

const homeController = {
  homePage: (req, res) => {
    // Pick 3 random "sanguches" every time the route is accessed
    const randomSanguches = pickRandomSanguches(3); 
    res.render("home", { inventory: randomSanguches });
  },

  aboutPage: (req, res) => {
    res.render("about-us");
  },
};

// Function to pick random "sanguches"
function pickRandomSanguches(amount) {
  let pickedSanguches = [];
  while (pickedSanguches.length < amount) {
    let id = Math.floor(Math.random() * inventory.length);
    if (inventory[id].category === "sanguche" && !pickedSanguches.includes(inventory[id])) {
      pickedSanguches.push(inventory[id]);
    }
  }
  return pickedSanguches;
}

module.exports = homeController;
