const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');


router.get("/producto", productController.detailPage);
router.get("/carrito", productController.cartPage);

module.exports = router;