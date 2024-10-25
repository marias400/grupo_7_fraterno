const db = require("../../database/models");

const productApi = {
    productCount(req, res) {
        db.Product.findAll().then((response) => {
            let productsArray = response.map((product) => ({
                id: product.id,
                name: product.name,
                description: product.description,
                category: product.category, 
                detail: `${req.protocol}://localhost:8000/products/detail/${product.id}`
            }));

            let categoryCount = {
                comida: 0,
                sanguche: 0,
                bebida: 0,
                snack: 0,
                postre: 0
            };

            productsArray.forEach((product) => {
                if (categoryCount.hasOwnProperty(product.category)) {
                    categoryCount[product.category] += 1;
                }
            });

            return res.json({
                count: response.length,
                countByCategory: categoryCount,
                products: productsArray,
            }); 
        }).catch(error => {
            console.log(error);
            return res.status(500).json({
                error: "Hubo un error al obtener los productos",
            });
        });
    },

    productById(req, res){
        let {id} = req.params
        db.Product.findByPk(id).then((data)=>{
            if(data !== null){
                return res.json(data);
            }else{
                return res.status(404).json({
                  status: 404,
                  error: "No se encontro usuario asociado al id ingresado "
                })
              }
            }).catch(error => {
              console.log(error);
              return res.status(500).json({
                status: 500,
                error: "Hubo un error al obtener el usuario"
              });
        });
    },
 }


module.exports = productApi;
