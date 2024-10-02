const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get("/detail/:id", productsController.detailPage);
router.get("/list", productsController.listPage)

module.exports = router;