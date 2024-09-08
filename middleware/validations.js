const { check } = require('express-validator');

const register = [
    check('firstName').notEmpty().withMessage('Ingrese su nombre.'),
    check('lastName').notEmpty().withMessage('Ingrese su apellido.'),
    check('email').isEmail().withMessage('Email no válido.'),
    check('phone').notEmpty().withMessage('Ingrese un número de teléfono.').bail()
        .isInt().withMessage('Ingrese únicamente el número sin caracteres especiales.'),
    check('password')
        .notEmpty().withMessage('Ingrese una contraseña.').bail()
        .isLength({ min: 6 }).withMessage('Debe tener un mínimo de 6 dígitos.').bail()
        .isAlphanumeric().withMessage('Caracteres inválidos.'),
    check('password_repeat')
        .notEmpty().withMessage('Repita la contraseña.').bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden.');
            }
            return true;
        }),
]

const login = [
    check('email').isEmpty().withMessage('Ingrese un Email').bail()
        .isEmail().withMessage('Email no valido'),
    check('password').notEmpty().withMessage('El campo contraseña esta vacio'),
]


module.exports = {
    login,
    register
}