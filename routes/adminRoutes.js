const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.get("/login", adminController.loginPage);
router.get("/products", adminController.productManagementPage);

module.exports = router;