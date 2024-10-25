const express = require("express");
const router = express.Router();
const userApi = require("../../controllers/api/userApi");
const productApi = require("../../controllers/api/productApi");



router.get("/users", userApi.userCount)
router.get("/users/:id", userApi.userById)
router.get("/products", productApi.productCount)
router.get("/products/:id", productApi.productById)

module.exports = router;