const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


router.get("/login", usersController.loginPage);
router.get("/register", usersController.registerPage);

module.exports = router;