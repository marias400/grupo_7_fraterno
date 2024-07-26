const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.get("/login", adminController.loginPage);


router.get("/products/:id", adminController.productManagementPage);
router.post("/products/", adminController.productEdit);


module.exports = router;