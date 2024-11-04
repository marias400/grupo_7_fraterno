let suggestions;

document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/products/", {
    method: "get",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.json();
    })
    .then((responseData) => {
      suggestions = responseData.products;
    })
    .catch((error) => {
      console.error(error);
    });
});

document.getElementById("search-input").addEventListener("input", function () {
  const input = this.value.toLowerCase();
  const filteredSuggestions = suggestions.filter((item) =>
    item.name.toLowerCase().includes(input)
  );

  const suggestionsList = document.getElementById("suggestionsList");
  suggestionsList.innerHTML = "";

  if (input && filteredSuggestions.length > 0) {
    filteredSuggestions.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item.name;
      listItem.onclick = function () {
        window.location.href = "/products/detail/" + item.id;
      };
      suggestionsList.appendChild(listItem);
    });
    suggestionsList.style.display = "block";
  } else {
    suggestionsList.style.display = "none";
  }
});
