
const products = require("../data/products");


// Function to pick random "sanguches"
function pickRandomSanguches(amount) {
    // Filtra los sanguches disponibles
    let availableSanguches = products.filter(
      (item) => item.category === "sanguche" || item.category === "comida"
    );
  
    // Determina el número máximo de sanguches que se pueden elegir
    let maxAmount = Math.min(amount, availableSanguches.length);
  
    let pickedSanguches = [];
    while (pickedSanguches.length < maxAmount) {
      let id = Math.floor(Math.random() * availableSanguches.length);
      if (!pickedSanguches.includes(availableSanguches[id])) {
        pickedSanguches.push(availableSanguches[id]);
      }
    }
    return pickedSanguches;
  }

  module.exports = pickRandomSanguches;