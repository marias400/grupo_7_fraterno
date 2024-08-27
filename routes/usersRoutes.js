const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { check } = require('express-validator');

const validacionesLogin = [
    check('email').isEmail().withMessage('Email no valido'),
    check('password').notEmpty().withMessage('El campo contraseña esta vacio'),
    check('password').isLength({min: 8}).withMessage('La contraseña es menor a 8 caracteres')
]

router.get("/login", usersController.loginPage);
router.get("/register", usersController.registerPage);
router.post("/login", validacionesLogin ,usersController.loginSuccesful);
router.post("/register", usersController.processRegister);

module.exports = router;