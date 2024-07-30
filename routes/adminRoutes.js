const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const fileUpload = require("../services/fileUpload.js");


router.get("/login", adminController.loginPage);

router.put("/products/search", adminController.editPage);
router.get("/products/:id/edit", adminController.editPage);
router.put("/products/:id", fileUpload.single("image"), adminController.editLogic);

module.exports = router;
