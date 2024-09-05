const db = require('../database/models');

 const cartsController = {
    list(req,res){
        db.Cart.findAll({
            include: [{association:'users'},{association:'products'}]
        }).then(carts=>{
            res.status(200).json(carts);
        })
    },
 }

 module.exports = cartsController;