let inventory = require('../data/inventory.json');

  function getRandomElements(arr, n) {
    let result = new Array(n);
    let len = arr.length;
    let taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandomElements: more elements taken than available");
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
  
  // Obtener 3 elementos aleatorios del arreglo 'inventory'
  let randomElements = getRandomElements(inventory, 3);
  
module.exports = randomElements;