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

let recentDelete = {};

undoBtn.addEventListener("click", undoAllHandler);

document
  .querySelector(".cart__content")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("cart__content--product-delete-icon")) {
      const id = e.target.getAttribute("data-id");
      const articleToDelete = document.querySelector(
        `.cart__content--product[data-id="${id}"]`
      );
      let key = e.target.dataset.uniqueid;
      let name = localStorage.getItem(key);

      if (!recentDelete[key]) {
        recentDelete[key] = name;
        localStorage.removeItem(key);

        const undoButton = document.createElement("button");
        undoButton.dataset.uniqueid = key;
        undoButton.innerText = "Deshacer";
        undoButton.classList.add("undo-individual");
        undoButton.addEventListener("click", undoHandler);
        articleToDelete.replaceChildren(undoButton);

        undoBtn.classList.remove("hidden");

        const url = "/cart/delete";
        const fetchMethod = "DELETE";
        sendData(url, fetchMethod, key);
        updateSubtotal();
      }
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  updateSubtotal();
  setButtonListeners();
});

function setButtonListeners() {
  plusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const quantityElement = document.querySelector(
        `.cart__content--product-middleblox-quantity[data-id="${id}"]`
      );

      let quantity = parseInt(quantityElement.textContent, 10);
      quantityElement.textContent = quantity + 1;
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
      updateSubtotal();
    });
  });
}

function sendData(url, fetchMethod, id) {
  let method = "POST";
  let localStorageObject = {};
  let localStorageString;

  if (fetchMethod) {
    method = fetchMethod;
  }

  if (id && recentDelete[id]) {
    let toDelete = {};
    toDelete[id] = recentDelete[id];
    localStorageString = JSON.stringify(toDelete);
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      localStorageObject[key] = localStorage.getItem(key);
    }
    localStorageString = JSON.stringify(localStorageObject);
  }
  fetch(url, {
    method: method,
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

async function undoHandler(e) {
  let data;
  let url = "/cart/add";
  e.preventDefault();
  const uniqueid = e.target.dataset.uniqueid;

  if (recentDelete[uniqueid]) {
    localStorage.setItem(uniqueid, recentDelete[uniqueid]);
    sendData(url);
    delete recentDelete[uniqueid];
  }

  e.target.classList.add("hidden");
  if (Object.keys(recentDelete).length === 0) {
    undoBtn.classList.add("hidden");
  }

  const articleToDelete = document.querySelector(
    `.cart__content--product[data-uniqueid="${uniqueid}"]`
  );
  const id = articleToDelete.dataset.id;
  articleToDelete.remove();

  await fetch(`/api/products/${id}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.json();
    })
    .then((responseData) => {
      data = responseData;
    })
    .catch((error) => {
      console.error(error);
    });

  const newProduct = document.createElement("article");
  newProduct.dataset.id = data.id;
  newProduct.dataset.uniqueid = uniqueid;
  newProduct.classList.add("cart__content--product");
  newProduct.innerHTML = `
  <i data-id="${data.id}" data-uniqueId="${uniqueid}" class="cart__content--product-delete-icon fa-regular fa-trash-can"></i>
  <img src="${data.image}" class="cart__content--product-image">
  <div class="cart__content--product-right-box">
    <div class="cart__content--product-middleblox">
      <div class="cart__content--product-middleblox-top">
        <p class="cart__content--product-middleblox-name">${data.name}</p>
      </div>
      <div class="cart__content--product-middleblox-bottom">
        <button data-id="${data.id}" class="cart__content--product-middleblox-quantityMinus">-</button>
        <span data-id="${data.id}" class="cart__content--product-middleblox-quantity">1</span>
        <button data-id="${data.id}" class="cart__content--product-middleblox-quantityPlus">+</button>
      </div>
    </div>
    <p data-id="${data.id}" class="cart__content--product-price">$${data.price}</p>
  </div>
  `;

  document.querySelector(".cart__content").appendChild(newProduct);
  setButtonListeners();
  updateSubtotal();
}

async function undoAllHandler(e) {
  e.preventDefault();
  const url = "/cart/add";

  for (const id in recentDelete) {
    localStorage.setItem(id, recentDelete[id]);

    // Find the corresponding undo button and article
    const undoButton = document.querySelector(`button[data-uniqueid="${id}"]`);
    const articleToDelete = undoButton.parentElement;

    // Remove the undo button and article
    articleToDelete.remove();

    // Fetch product data
    let data;
    await fetch(`/api/products/${articleToDelete.dataset.id}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((responseData) => {
        data = responseData;
      })
      .catch((error) => {
        console.error(error);
      });

    // Create a new product element
    const newProduct = document.createElement("article");
    newProduct.dataset.id = data.id;
    newProduct.dataset.uniqueid = id;
    newProduct.classList.add("cart__content--product");
    newProduct.innerHTML = `
      <i data-id="${data.id}" data-uniqueId="${id}" class="cart__content--product-delete-icon fa-regular fa-trash-can"></i>
      <img src="${data.image}" class="cart__content--product-image">
      <div class="cart__content--product-right-box">
        <div class="cart__content--product-middleblox">
          <div class="cart__content--product-middleblox-top">
            <p class="cart__content--product-middleblox-name">${data.name}</p>
          </div>
          <div class="cart__content--product-middleblox-bottom">
            <button data-id="${data.id}" class="cart__content--product-middleblox-quantityMinus">-</button>
            <span data-id="${data.id}" class="cart__content--product-middleblox-quantity">1</span>
            <button data-id="${data.id}" class="cart__content--product-middleblox-quantityPlus">+</button>
          </div>
        </div>
        <p data-id="${data.id}" class="cart__content--product-price">$${data.price}</p>
      </div>
    `;

    // Append the new product element to the cart
    document.querySelector(".cart__content").appendChild(newProduct);
  }

  // Reset recentDelete, hide undo buttons, and update UI
  recentDelete = {};
  undoBtn.classList.add("hidden");
  const individualUndoButtons = document.querySelectorAll(".undo-individual");
  individualUndoButtons.forEach((button) => button.classList.add("hidden"));

  sendData(url);
  setButtonListeners();
  updateSubtotal();
}

const updateSubtotal = () => {
  let newSubtotal = 0;

  const cartProduct = document.querySelectorAll(".cart__content--product");
  cartProduct.forEach((product) => {
    let innerValue = product.querySelector(
      ".cart__content--product-middleblox-quantity"
    );
    let innerPrice = product.querySelector(".cart__content--product-price");
    let quantity = 0;
    let price = 0;
    if (innerValue !== null && innerPrice !== null) {
      let priceText = innerPrice.textContent
        .trim()
        .replace("$", "")
        .replace(",", "");
      quantity = parseInt(innerValue.textContent.trim(), 10);
      price = parseFloat(priceText);

      if (isNaN(price)) {
        console.error(
          `El valor del precio no es válido: ${innerPrice.textContent}`
        );
        price = 0;
      }
    }
    newSubtotal += quantity * price;
  });
  if (subtotalElement) {
    subtotalElement.innerText = `$${newSubtotal.toFixed(2)}`;
  }
};
