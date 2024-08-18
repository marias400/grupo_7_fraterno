const { check } = require('express-validator');

const validacionesLogin = [
    check('email').isEmail().withMessage('Email no valido'),
    check('password').notEmpty().withMessage('El campo contraseña esta vacio'),
    check('password').isLength({min: 8}).withMessage('La contraseña es menor a 8 caracteres')
]

module.exports = validacionesLogin