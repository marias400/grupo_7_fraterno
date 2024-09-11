const datasource = require("../services/inventoryData");
const inventoryData = require("../services/inventoryData");
const db = require('../database/models');
const { Where } = require("sequelize/lib/utils");
const { where } = require("sequelize");

//vistas administrador:

const adminController = {
  products: null,

  //
  //Envia un producto al formulario de edicion y carga los productos en un selector.
 
  async editPage(req, res) {

    
    let { id } = req.params;
    let inventoryItem = db.Product.findByPk(id);
    let products = db.Product.findAll();

    Promise
        .all([products, inventoryItem])
        .then(([products,inventoryItem]) => {
          let ingredients = inventoryItem.ingredients.split(",");
          inventoryItem.ingredients = ingredients;
          //console.log(inventoryItem);
          res.render("admin/product-editor", { id, productItem: inventoryItem,products});

        })
        .catch(error => res.send(error))
   
  },

  //Guardar la edicion de un producto
  
  async editLogic(req, res) {
  //  this.products = await inventoryData.load();
    let { id } = req.params;
     db.Product.findByPk(id)
        .then(product=>{
          if(product === null){
            console.log("Producto no encontrado!");

          } else {
            let editedProduct = {
              name: req.body.name, description: req.body.description,
              image: req.body.image, category: req.body.category, suitability: req.body.suitability,
              size: req.body.size, price: req.body.price  
              // faltaria Stock en la vista (formulario)            
            }
            db.Product.update(editedProduct,{where:{id}})
                .then(resultado=>{
                  console.log(resultado);
                  res.redirect(`/admin/products/${id}/edit`);
                 // res.render("admin/product-editor", { productItem: products});
                })
          }
        })

        
   // const id = req.params.id;
  //  const { image } = this.products.find((item) => item.id === id);

    // Lógica para determinar la imagen de producto
    // let imageFilePath;

    // if (req.file) {
    //   // Si se subió una nueva imagen
    //   imageFilePath = `/images/products/${req.file.filename}`;

    //   // Si había una imagen anterior, eliminarla
    //   if (image && image !== "" && image !== "/images/products/default.png") {
    //     datasource.removeFile(image);
    //   }
    // } else {
    //   // Si no se subió una nueva imagen
    //   if (image && image !== "") {
    //     // Mantener la imagen anterior si existe
    //     imageFilePath = image;
    //   } else {
    //     // Si no había imagen anterior, establecer la imagen por defecto
    //     imageFilePath = "/images/products/default.png";
    //   }
    // }

    // const {
    //   name,
    //   description,
    //   sku,
    //   ingredients,
    //   category,
    //   vegetarian,
    //   vegan,
    //   celiac,
    //   size,
    //   price,
    // } = req.body;

    // let suitability = {
    //   vegetarian: vegetarian === "on" || false,
    //   vegan: vegan === "on" || false,
    //   celiac: celiac === "on" || false,
    // };

    // //modificacion a la "base de datos"
    // const updatedInventory = products.map((toModify) => {
    //   if (toModify.id === id) {
    //     return {
    //       id,
    //       name,
    //       description,
    //       sku,
    //       ingredients: ingredients.split(", "),
    //       image: imageFilePath,
    //       category,
    //       suitability,
    //       size,
    //       price,
    //     };
    //   } else {
    //     return toModify;
    //   }
    // });

    // await inventoryData.save(updatedInventory);

    // res.redirect(`/admin/products/${id}/edit`);
  },

  async createPage(req, res) {
    this.products = await inventoryData.load();
    res.render("admin/product-creator", { products: this.products });
  },

  async createProduct(req, res) {
    this.products = await inventoryData.load();

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

    let imageFilePath;

    if (req.file) {
      imageFilePath = `/images/products/${req.file.filename}`;
    } else {
      imageFilePath = "/images/products/default.png";
    }

    const suitability = {
      vegetarian: vegetarian === "on" || false ? true : false,
      vegan: vegan === "on" || false ? true : false,
      celiac: celiac === "on" || false ? true : false,
    };

    const id = crypto.randomUUID();

    newItem = {
      id: id,
      name: name,
      description: description,
      sku: sku,
      ingredients: ingredients.split(", "),
      image: imageFilePath,
      category: category,
      suitability: suitability,
      size: size,
      price: price,
    };

    let updatedInventory = products;
    updatedInventory.push(newItem);

    await inventoryData.save(updatedInventory);

    res.redirect(`/admin/products/${id}/edit`);
  },

  async deleteProduct(req, res) {
    this.products = await inventoryData.load();
    const id = req.params.id;

    const { image } = this.products.find((item) => item.id === id);

    const updatedInventory = this.products.filter((toModify) => {
      return toModify.id !== id;
    });

    if (image !== "/images/products/default.png") {
      await inventoryData.removeFile(image);
    }

    await inventoryData.save(updatedInventory);

    res.redirect("/products/list");
  },
};

module.exports = adminController;
