const db = require('../database/models');

//vistas administrador:
const adminController = {
  //Envia un producto al formulario de edicion y carga los productos en un selector.

  async editPage(req, res) {
    let { id } = req.params;
    let inventoryItem = db.Product.findByPk(id);
    let products = db.Product.findAll();

    if (id) {
      Promise.all([products, inventoryItem])
        .then(
        ([products, inventoryItem]) => {
          let ingredients = inventoryItem.ingredients.split(",");
          inventoryItem.ingredients = ingredients;
          // console.log(inventoryItem);
          res.render("admin/product-editor", {
            id,
            productItem: inventoryItem,
            products,
          });
        }
      );
    } else {
      let id = req.body.searchId;
      res.redirect(`${id}/edit`);
    }
  },

  //Guardar la edicion de un producto

  async editLogic(req, res) {
    //  this.products = await inventoryData.load();
    let { id } = req.params;
    db.Product.findByPk(id).then((product) => {
      if (product === null) {
        console.log("Producto no encontrado!");
      } else {
        let newImage = "";
        if (req.file) {
          // Si se sube una nueva imagen, borra la anterior y guarda el path de la nueva
          if (product.image != "/images/products/default.png") {
            datasource.removeFile(product.image);
          }
          newImage = `/images/products/${req.file.filename}`;
        } else {
          // Sino mantiene la imagen vieja o sino contiene un path valido setea una por defecto
          newImage = product.image;
          if (!product.image.includes("/images/products/")) {
            newImage = "/images/products/default.png";
          }
        }

        let editedProduct = {
          name: req.body.name,
          description: req.body.description,
          ingredients: req.body.ingredients,
          image: newImage,
          category: req.body.category,
          suitability: req.body.suitability,
          size: req.body.size,
          price: req.body.price,
          // faltaria Stock en la vista (formulario)
        };
        db.Product.update(editedProduct, { where: { id } }).then(
          (resultado) => {
            //console.log(resultado);
            res.redirect(`/admin/products/${id}/edit`);
            // res.render("admin/product-editor", { productItem: products});
          }
        );
      }
    });

    // faltaria suitability mostrar y tomar el valor de checks (retirados)
  },

  async createPage(req, res) {
    db.Product.findAll()
      .then((products) => {
        res.render("admin/product-creator", { products });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async createProduct(req, res) {
    let newImage = "";
    if (req.file) {
      // Si se sube una nueva imagen
      newImage = `/images/products/${req.file.filename}`;
    } else {
      // setea una por defecto
      newImage = "/images/products/default.png";
    }

    let newProduct = {
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      image: newImage,
      category: req.body.category,
      suitability: req.body.suitability,
      size: req.body.size,
      price: req.body.price,
      // faltaria Suitabilitys y Stock en la vista (formulario)
    };

    db.Product.create(newProduct).then((resultado) => {
      // console.log(resultado);
      res.redirect(`/admin/products/${resultado.id}/edit`);
      // res.render("admin/product-editor", { productItem: resultado});
    });
  },

  async deleteProduct(req, res) {
    let id = req.params.id;
    db.Product.destroy({
      where: { id },
    }).then((result) => {
      if (result != 0) {
        res.redirect("/products/list");
      }
    });
  },
};

module.exports = adminController;
