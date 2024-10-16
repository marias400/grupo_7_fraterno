function sendData(url) {
  const localStorageObject = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localStorageObject[key] = localStorage.getItem(key);
  }
  const localStorageString = JSON.stringify(localStorageObject);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: localStorageString,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.json();
    })
    .then((responseData) => {
      console.log("Datos enviados correctamente:", responseData);
    })
    .catch((error) => {
      console.error(error);
    });
}

async function addToCart() {
  const productName = document.querySelector(".stripe__tags--product-name p");
  let randomKey = "id" + Math.random().toString(16).slice(2);
  localStorage.setItem(randomKey, productName.innerText);

  //cambiar por mejor feedback al usuario!!!
  window.confirm("Producto agregado al carrito!");

  const url = "/cart/add";
  sendData(url);

  fetch("/cart/items/footer")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.json();
    })
    .then((responseData) => {
      const cartLength = responseData.cartLength;
      const cartAmount = document.getElementById("cart-shopping");
      cartAmount.innerText = cartLength;
    })
    .catch((error) => {
      console.error(error);
    });
}

function increment(id) {
  const valueSpan = document.getElementById(`value-${id}`);
  let value = parseInt(valueSpan.innerText, 10);
  value++;
  valueSpan.innerText = value;
}

function decrement(id) {
  const valueSpan = document.getElementById(`value-${id}`);
  let value = parseInt(valueSpan.innerText, 10);
  if (value > 0) {
    // Optional: to avoid negative values
    value--;
  }
  valueSpan.innerText = value;
}
