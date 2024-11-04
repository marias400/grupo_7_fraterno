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
  const productName = document.querySelector(
    ".stripe__tags--product-name p"
  ).innerText;

  let existingProductKey = null;
  let existingProductQuantity = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const storedProduct = JSON.parse(localStorage.getItem(key));
    if (storedProduct.name === productName) {
      existingProductKey = key;
      existingProductQuantity = storedProduct.quantity;
      break;
    }
  }

  if (existingProductKey) {
    localStorage.setItem(
      existingProductKey,
      JSON.stringify({
        name: productName,
        quantity: existingProductQuantity + 1,
      })
    );
  } else {
    let randomKey = "id" + Math.random().toString(16).slice(2);
    localStorage.setItem(
      randomKey,
      JSON.stringify({
        name: productName,
        quantity: 1,
      })
    );
  }

  const confirmationMessage = document.createElement("div");
  confirmationMessage.classList.add("confirmation-message");
  confirmationMessage.innerText = "Producto agregado al carrito!";
  document.body.appendChild(confirmationMessage);

  setTimeout(() => {
    confirmationMessage.remove();
  }, 3000);

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
