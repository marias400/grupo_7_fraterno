const { check } = require('express-validator');
const path = require("path");

const register = [
    check('firstName').notEmpty().withMessage('Este campo es obligatorio.').bail()
        .isLength({min: 2}).withMessage('Debe tener mínimo 2 caracteres'),
    check('lastName').notEmpty().withMessage('Ingrese su apellido.'),
    check('email').isEmail().withMessage('Email no válido.'),
    check('phone').notEmpty().withMessage('Ingrese un número de teléfono.').bail()
        .isInt().withMessage('Ingrese únicamente el número sin caracteres especiales.'),
    check('image')
        .custom((value, { req }) => {
            if (req.file) {
                const filetypes = /jpeg|jpg|png|gif/;
                const extname = filetypes.test(path.extname(req.file.originalname).toLowerCase());
                if (!extname) {
                    throw new Error('Archivo con extensión no permitida. Solo se permiten JPEG, JPG, PNG o GIF.');
                }
                return true;
            } else {
                throw new Error('Debe subir una foto de perfil.');
            }
        }),
    check('password')
        .notEmpty().withMessage('Ingrese una contraseña.').bail()
        .isLength({ min: 8 }).withMessage('Debe tener un mínimo de 8 caracteres.').bail()
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
    check('email').notEmpty().withMessage('* Ingrese un email').bail()
        .isEmail().withMessage('* Ingrese un email válido'),
    check('password').notEmpty().withMessage('* Ingrese una contraseña'),
]


module.exports = {
    login,
    register
}