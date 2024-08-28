const { check } = require('express-validator');

const validacionesLogin = [
    check('email').isEmail().withMessage('Email no valido'),
    check('password').notEmpty().withMessage('El campo contraseña esta vacio'),
]

module.exports = validacionesLogin