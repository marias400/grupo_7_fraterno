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
const undoBtn = document.querySelector(".undoBtn");
undoBtn.addEventListener("click", undoHandler);

let recentDelete = {};

function sendData() {
  const localStorageObject = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localStorageObject[key] = localStorage.getItem(key);
  }
  const localStorageString = JSON.stringify(localStorageObject);

  fetch("/cart/add", {
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

//envio inicial de productos en memoria local
sendData();

// Función para actualizar el subtotal
const updateSubtotal = () => {
  let newSubtotal = 0;

  // Recorremos todos los productos para calcular el subtotal
  const cartProduct = document.querySelectorAll(".cart__content--product");
  cartProduct.forEach((product) => {
    let innerValue = product.querySelector(
      ".cart__content--product-middleblox-quantity"
    );
    let innerPrice = product.querySelector(".cart__content--product-price");
    let quantity = 0;
    let price = 0;
    if (innerValue !== null) {
      quantity = parseInt(innerValue.textContent, 10);
      price = parseFloat(innerPrice.textContent.replace("$", ""));
    }
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
    let name = localStorage.getItem(e.target.dataset.uniqueid);
    let key = e.target.dataset.uniqueid;
    recentDelete[key] = name;
    localStorage.removeItem(key);

    // undo button 2.0
    const undoButton = document.createElement("button");
    undoButton.dataset.uniqueid = key;
    undoButton.innerText = "Deshacer";
    undoButton.addEventListener("click", undoHandler);
    articleToDelete.replaceChildren(undoButton);
    // undo button 2.0

    updateSubtotal();
    sendData();
  });
});

function undoHandler(e) {
  e.preventDefault();
  let uniqueid = e.target.dataset.uniqueid;

  for (const id in recentDelete) {
    if (id === uniqueid) {
      localStorage.setItem(id, recentDelete[id]);
      delete recentDelete[uniqueid];
    }
  }
  sendData();
  updatePage(window.location.href);
}

async function updatePage(url) {
  await fetch(url, {
    headers: {
      Pragma: "no-cache",
      Expires: "-1",
      "Cache-Control": "no-cache",
    },
  });
  window.location.href = url;
  window.location.reload();
}
