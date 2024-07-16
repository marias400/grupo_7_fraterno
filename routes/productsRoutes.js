const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');


router.get("/detail", productsController.detailPage);
router.get("/cart", productsController.cartPage);
router.get("/admin", productsController.adminPage);

module.exports = router;