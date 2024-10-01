const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.get("/", cartController.cartPage);
router.post("/add",cartController.cartAddItem);

//para testeo :D
//router.get("/test", cartController.test);

module.exports = router;