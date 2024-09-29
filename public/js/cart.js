const plusButtons = document.querySelectorAll(
  ".cart__content--product-middleblox-quantityPlus"
);
const minusButtons = document.querySelectorAll(
  ".cart__content--product-middleblox-quantityMinus"
);
const deleteIcons = document.querySelectorAll(
  ".cart__content--product-delete-icon"
);
const subtotalElement = document.getElementById("subtotal");

function sendData() {
  const localStorageObject = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localStorageObject[key] = localStorage.getItem(key);
  }

  const localStorageString = JSON.stringify(localStorageObject);

  fetch("/cart/test", {
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
    });
}

//envio inicial de productos en memoria local
sendData();

// Función para actualizar el subtotal
const updateSubtotal = () => {
  let newSubtotal = 0;

  // Recorremos todos los productos para calcular el subtotal
  document.querySelectorAll(".cart__content--product").forEach((product) => {
    const quantity = parseInt(
      product.querySelector(".cart__content--product-middleblox-quantity")
        .textContent,
      10
    );
    const price = parseFloat(
      product
        .querySelector(".cart__content--product-price")
        .textContent.replace("$", "")
    );
    newSubtotal += quantity * price;
  });

  // Actualizamos el subtotal en el DOM
  subtotalElement.innerText = `$${newSubtotal.toFixed(2)}`;
};

plusButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const id = this.getAttribute("data-id");
    const quantityElement = document.querySelector(
      `.cart__content--product-middleblox-quantity[data-id="${id}"]`
    );

    let quantity = parseInt(quantityElement.textContent, 10);
    quantityElement.textContent = quantity + 1;

    // Actualizar el subtotal después de cambiar la cantidad
    updateSubtotal();
  });
});

minusButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const id = this.getAttribute("data-id");
    const quantityElement = document.querySelector(
      `.cart__content--product-middleblox-quantity[data-id="${id}"]`
    );

    let quantity = parseInt(quantityElement.textContent, 10);
    if (quantity > 1) {
      quantityElement.textContent = quantity - 1;
    }

    // Actualizar el subtotal después de cambiar la cantidad
    updateSubtotal();
  });
});

deleteIcons.forEach((icon) => {
  icon.addEventListener("click", function (e) {
    const id = this.getAttribute("data-id");
    const articleToDelete = document.querySelector(
      `.cart__content--product[data-id="${id}"]`
    );
    localStorage.removeItem(e.target.dataset.uniqueid);
    articleToDelete.remove();
    updateSubtotal();

    sendData();
  });
});
