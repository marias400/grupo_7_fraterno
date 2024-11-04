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
      const uniqueId = e.target.getAttribute("data-uniqueid");
      const articleToDelete = document.querySelector(
        `.cart__content--product[data-id="${id}"]`
      );
      const articleToDeleteQuantity = parseInt(
        document.querySelector(
          `.cart__content--product-middleblox-quantity[data-id="${id}"]`
        ).innerText
      );

      let name = localStorage.getItem(uniqueId);

      if (!recentDelete[uniqueId]) {
        recentDelete[uniqueId] = JSON.stringify({
          name,
          quantity: articleToDeleteQuantity,
        });
        localStorage.removeItem(uniqueId);

        const undoButton = document.createElement("button");
        undoButton.dataset.uniqueid = uniqueId;
        undoButton.innerText = "Deshacer";
        undoButton.classList.add("undo-individual");
        undoButton.addEventListener("click", undoHandler);
        articleToDelete.replaceChildren(undoButton);

        undoBtn.classList.remove("hidden");

        const url = "/cart/delete";
        const fetchMethod = "DELETE";
        sendData(url, fetchMethod, uniqueId);
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
      const uniqueId = this.dataset.uniqueid;
      const quantityElement = document.querySelector(
        `.cart__content--product-middleblox-quantity[data-id="${id}"]`
      );

      let quantity = parseInt(quantityElement.textContent, 10);
      quantityElement.textContent = quantity + 1;

      if (localStorage.getItem(uniqueId)) {
        let item = JSON.parse(localStorage.getItem(uniqueId));
        item.quantity += 1;
        localStorage.setItem(uniqueId, JSON.stringify(item));
      }
      updateSubtotal();
    });
  });

  minusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const uniqueId = this.dataset.uniqueid;
      const quantityElement = document.querySelector(
        `.cart__content--product-middleblox-quantity[data-id="${id}"]`
      );

      let quantity = parseInt(quantityElement.textContent, 10);
      if (quantity > 1) {
        quantityElement.textContent = quantity - 1;

        if (localStorage.getItem(uniqueId)) {
          let item = JSON.parse(localStorage.getItem(uniqueId));
          item.quantity -= 1;
          localStorage.setItem(uniqueId, JSON.stringify(item));
        }
        updateSubtotal();
      }
    });
  });
}

async function sendData(url, fetchMethod = "POST", id = null) {
  let localStorageObject = {};
  let localStorageString;

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

  try {
    const response = await fetch(url, {
      method: fetchMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: localStorageString,
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const responseData = await response.json();
    console.log("Datos enviados correctamente:", responseData);
  } catch (error) {
    console.error(error);
  }
}

async function undoHandler(e) {
  e.preventDefault();
  const uniqueid = e.target.dataset.uniqueid;
  const productData = JSON.parse(recentDelete[uniqueid])
  if (recentDelete[uniqueid]) {
    const toRestore = JSON.parse(recentDelete[uniqueid])
    localStorage.setItem(uniqueid, toRestore.name);
    sendData("/cart/add");
    delete recentDelete[uniqueid];
  }

  e.target.classList.add("hidden");
  if (Object.keys(recentDelete).length === 0) {
    undoBtn.classList.add("hidden");
  }

  const articleToDelete = document.querySelector(
    `.cart__content--product[data-uniqueid="${uniqueid}"]`
  );

  if (!articleToDelete) return;
  const id = articleToDelete.dataset.id;
  articleToDelete.remove();

  try {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    const data = await response.json();

    const newProduct = document.createElement("article");
    newProduct.dataset.id = data.id;
    newProduct.dataset.uniqueid = uniqueid;
    newProduct.classList.add("cart__content--product");

    const deleteIcon = document.createElement("i");
    deleteIcon.dataset.id = data.id;
    deleteIcon.dataset.uniqueid = uniqueid;
    deleteIcon.className =
      "cart__content--product-delete-icon fa-regular fa-trash-can";

    const img = document.createElement("img");
    img.src = data.image;
    img.classList.add("cart__content--product-image");

    const rightBox = document.createElement("div");
    rightBox.classList.add("cart__content--product-right-box");

    const middleblox = document.createElement("div");
    middleblox.classList.add("cart__content--product-middleblox");

    const middlebloxTop = document.createElement("div");
    middlebloxTop.classList.add("cart__content--product-middleblox-top");
    const productName = document.createElement("p");
    productName.className = "cart__content--product-middleblox-name";
    productName.textContent = data.name;
    middlebloxTop.appendChild(productName);

    const middlebloxBottom = document.createElement("div");
    middlebloxBottom.classList.add("cart__content--product-middleblox-bottom");
    const minusButton = document.createElement("button");
    minusButton.dataset.id = data.id;
    minusButton.className = "cart__content--product-middleblox-quantityMinus";
    minusButton.textContent = "-";
    const quantitySpan = document.createElement("span");
    quantitySpan.dataset.id = data.id;
    quantitySpan.className = "cart__content--product-middleblox-quantity";
    quantitySpan.textContent = productData.quantity;
    const plusButton = document.createElement("button");
    plusButton.dataset.id = data.id;
    plusButton.className = "cart__content--product-middleblox-quantityPlus";
    plusButton.textContent = "+";

    middlebloxBottom.append(minusButton, quantitySpan, plusButton);
    middleblox.append(middlebloxTop, middlebloxBottom);
    rightBox.append(middleblox);

    const priceElement = document.createElement("p");
    priceElement.dataset.id = data.id;
    priceElement.className = "cart__content--product-price";
    priceElement.textContent = `$${data.price}`;

    rightBox.appendChild(priceElement);
    newProduct.append(deleteIcon, img, rightBox);

    document.querySelector(".cart__content").appendChild(newProduct);
    setButtonListeners();
    updateSubtotal();
  } catch (error) {
    console.error(error);
  }
}

async function undoAllHandler(e) {
  e.preventDefault();
  const url = "/cart/add";

  for (const id in recentDelete) {
    const toRestore = JSON.parse(recentDelete[id])
    localStorage.setItem(id, toRestore.name);

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

function updateSubtotal() {
  const prices = document.querySelectorAll(".cart__content--product-price");
  const quantities = document.querySelectorAll(
    ".cart__content--product-middleblox-quantity"
  );

  let subtotal = 0;

  prices.forEach((priceElement, index) => {
    const price = parseFloat(priceElement.textContent.replace("$", ""));
    const quantity = parseInt(quantities[index].textContent, 10);
    subtotal += price * quantity;
  });

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
}
