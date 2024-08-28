const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const fileUpload = require("../services/fileUpload.js");
const adminAuth = require("../middleware/adminAuth");

router.put("/products/search", adminAuth, adminController.editPage);
router.get("/products/:id/edit", adminAuth, adminController.editPage);
router.put(
  "/products/:id",
  fileUpload.single("image"),
  adminAuth,
  adminController.editLogic
);
router.get("/products/create", adminAuth, adminController.createPage);
router.post(
  "/products/create",
  fileUpload.single("image"),
  adminAuth,
  adminController.createProduct
);
router.delete("/products/:id", adminAuth, adminController.deleteProduct);

module.exports = router;
