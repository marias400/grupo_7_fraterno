const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const fileUpload = require("../services/fileUpload.js");
const auth = require("../middleware/auth");

router.put("/products/search", auth.adminAuth, adminController.editPage);
router.get("/products/:id/edit", auth.adminAuth, adminController.editPage);
router.put(
  "/products/:id",
  fileUpload.single("image"),
  auth.adminAuth,
  adminController.editLogic
);
router.get("/products/create", auth.adminAuth, adminController.createPage);
router.post(
  "/products/create",
  fileUpload.single("image"),
  auth.adminAuth,
  adminController.createProduct
);
router.delete("/products/:id", auth.adminAuth, adminController.deleteProduct);

module.exports = router;
