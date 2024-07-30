const datasource = require("../services/inventoryData");
const inventoryData = require("../services/inventoryData");

//vistas administrador:

const adminController = {
  inventory: null,

  //aun no existe
  async loginPage(req, res) {
    res.render("admin/log-in");
  },

  //busca y edita producto
  async editPage(req, res) {
    this.inventory = await inventoryData.load();
    let id = parseInt(req.params.id);

    if ((typeof id ===  'number') && !isNaN(id)) {
      res.render("admin/product-editor", { id, inventory });
    } else {
      let id = parseInt(req.body.searchId);
      res.redirect(`${id}/edit`);
    }
  },

  //edita producto
  async editLogic(req, res) {
    this.inventory = await inventoryData.load();

    console.log(req.params);
    console.log(this.inventory);
    const id = parseInt(req.params.id);
    const { image } = this.inventory.find((item) => item.id === id);

    // Lógica para determinar la imagen de producto
    let imageFilePath;

    if (req.file) {
      // Si se subió una nueva imagen
      imageFilePath = `/images/products/${req.file.filename}`;

      // Si había una imagen anterior, eliminarla
      if (image && image !== "" && image !== "/images/products/default.png") {
        datasource.removeFile(image);
      }
    } else {
      // Si no se subió una nueva imagen
      if (image && image !== "") {
        // Mantener la imagen anterior si existe
        imageFilePath = image;
      } else {
        // Si no había imagen anterior, establecer la imagen por defecto
        imageFilePath = "/images/products/default.png";
      }
    }

    const {
      name,
      description,
      sku,
      ingredients,
      category,
      vegetarian,
      vegan,
      celiac,
      size,
      price,
    } = req.body;

    let suitability = {
      vegetarian: vegetarian === "on" || false,
      vegan: vegan === "on" || false,
      celiac: celiac === "on" || false,
    };

    //modificacion a la "base de datos"
    const updatedInventory = inventory.map((toModify) => {
      if (toModify.id === id) {
        return {
          id,
          name,
          description,
          sku,
          ingredients: ingredients.split(", "),
          image: imageFilePath,
          category,
          suitability,
          size,
          price,
        };
      } else {
        return toModify;
      }
    });

    await inventoryData.save(updatedInventory);

    res.redirect(`/admin/products/${id}/edit`);
  },
};

module.exports = adminController;
