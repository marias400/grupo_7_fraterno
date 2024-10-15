const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.get("/", cartController.cartPage);
router.get("/items", cartController.cartItems);
router.get('/items/footer', cartController.cartLength)
router.post("/add", cartController.cartAddItem);
router.delete("/delete", cartController.cartDeleteItem);
router.post("/checkout", cartController.cartCheckout);

//para testeo :D
//router.get("/test", cartController.test);

module.exports = router;
