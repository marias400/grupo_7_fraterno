const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get("/ingresar", userController.loginPage);
router.get("/registrar", userController.registerPage);

module.exports = router;