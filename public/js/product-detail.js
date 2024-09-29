async function addToCart() {
  const productName = document.querySelector(".stripe__tags--product-name p");
  let randomKey = "id" + Math.random().toString(16).slice(2);
  sessionStorage.setItem(randomKey, productName.innerText);

  window.confirm("Producto agregado al carrito!");

  const sessionStorageObject = {};

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    sessionStorageObject[key] = sessionStorage.getItem(key);
  }

  const sessionStorageString = JSON.stringify(sessionStorageObject);


  fetch("/cart/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: sessionStorageString,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.json();
    })
    .then((responseData) => {
      console.log("Datos enviados correctamente:", responseData);
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
