const { check } = require('express-validator');
const path = require("path");
const db = require("../database/models");

const register = [
    check('firstName').notEmpty().withMessage('* Ingresar su nombre').bail()
        .isLength({min: 2}).withMessage('* Debe tener mínimo 2 caracteres'),
    check('lastName').notEmpty().withMessage('* Ingresar su apellido').bail()
        .isLength({min: 2}).withMessage('* Debe tener mínimo 2 caracteres'),
        check('email')
            .isEmail().withMessage('* Ingresar un email válido')
            .custom(async (value, { req }) => {
            if (req.body.email) {
                const user = await db.User.findOne({
                where: { email: req.body.email },
                });
                if (user) {
                throw new Error('* El email ya está en uso');
                }
            }
          return true;
        }),      
    check('phone').optional({ checkFalsy: true })
        .isInt().withMessage('* No ingresar caracteres especiales').bail()
        .isLength({ min: 10, max: 15 }).withMessage('* El número debe tener entre 10 y 15 dígitos'),
    check('image')
        .custom((value, { req }) => {
            if (req.file) {
              const filetypes = /jpeg|jpg|png|gif/;
              const extname = filetypes.test(path.extname(req.file.originalname).toLowerCase());
              if (!extname) {
                throw new Error('* Archivo con extensión no permitida. Solo se permiten JPEG, JPG, PNG o GIF');
              }
            }
            return true;
          }),
    check('password')
        .notEmpty().withMessage('* Ingresar una contraseña').bail()
        .isLength({ min: 8 }).withMessage('* Debe tener un mínimo de 8 caracteres').bail()
        .matches(/[A-Z]/).withMessage('* Debe contener al menos una letra mayúscula').bail()
        .matches(/[a-z]/).withMessage('* Debe contener al menos una letra minúscula').bail()
        .matches(/[0-9]/).withMessage('* Debe contener al menos un número').bail()
        .matches(/[\W_]/).withMessage('* Debe contener al menos un carácter especial (por ejemplo: @, !, #, $, etc.)'),
    check('password_repeat')
        .notEmpty().withMessage('* Repita la contraseña.').bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('* Las contraseñas no coinciden.');
            }
            return true;
        }),
]

const login = [
    check('email').notEmpty().withMessage('* Ingresar un email').bail()
        .isEmail().withMessage('* Ingresar un email válido'),
    check('password').notEmpty().withMessage('* Ingresar una contraseña'),
]

const editProfile = [
    check('firstName').notEmpty().withMessage('* Ingresar su nombre').bail()
        .isLength({min: 2}).withMessage('* Debe tener mínimo 2 caracteres'),
    check('lastName').notEmpty().withMessage('* Ingresar su apellido').bail()
        .isLength({min: 2}).withMessage('* Debe tener mínimo 2 caracteres'),
    check('address').notEmpty().withMessage('* Ingresar una dirección').bail()
        .isLength({min: 5}).withMessage('* Debe tener mínimo 5 caracteres'),
    check('phone').optional({ checkFalsy: true })
        .isInt().withMessage('* No ingresar caracteres especiales').bail()
        .isLength({ min: 10, max: 15 }).withMessage('* El número debe tener entre 10 y 15 dígitos'),
    check('email').isEmail().withMessage('* Ingresar un email válido'),
]

const changePassword = [
    check('currentPassword').notEmpty().withMessage('* Ingresar su contraseña actual').bail(),
    check('password').notEmpty().withMessage('* Ingresar una nueva contraseña').bail()
        .isLength({ min: 8 }).withMessage('* Debe tener un mínimo de 8 caracteres').bail()
        .matches(/[A-Z]/).withMessage('* Debe contener al menos una letra mayúscula').bail()
        .matches(/[a-z]/).withMessage('* Debe contener al menos una letra minúscula').bail()
        .matches(/[0-9]/).withMessage('* Debe contener al menos un número').bail()
        .matches(/[\W_]/).withMessage('* Debe contener al menos un carácter especial (por ejemplo: @, !, #, $, etc.)'),
    check('repassword').notEmpty().withMessage('* Repita la nueva contraseña.').bail()
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error('* Las contraseñas no coinciden.');
            }
            return true;
        }),
]

const product = [
    check('name').notEmpty().withMessage('* Debe ingresar un nombre o titulo para el producto').bail()
    .isLength({min: 5, max: 45}).withMessage('* El nombre debe ser entre 5 y 45 caracteres'),
    check('description').notEmpty().withMessage('* Debe ingresar una descripcion breve').bail()
    .isLength({min: 20, max: 200}).withMessage('* La descripcion debe ser entre 20 y 200 caracteres'),
    check('ingredients').notEmpty().withMessage('* Debe ingresar al menos un ingrediente').bail()
    .isLength({min: 3, max: 45}).withMessage('* Los ingredientes deben estar separados por "," , tener una palabra de minimo 3 caracteres y no superar los 45 caracteres'),
    check('category').notEmpty().withMessage('* Debe seleccionar una categoria').bail()
    .isIn(['comida', 'sanguche', 'bebida', 'snack', 'postre', 'otro'])
    .withMessage('* La categoría seleccionada no es válida'),
    check('image')
    .custom((value, { req }) => {
        // Si no se subió una nueva imagen y existe una imagen ya definida, omitir la validación
        if (!req.file && req.method === 'PUT' && req.body.currentImage) {
        return true;
        }
        if (!req.body.currentImage && !req.file) {
            throw new Error('* Debe subir una imagen con extensión válida (JPEG, JPG, PNG o GIF).');
        }
        return true;
  }),
    check('size').notEmpty().withMessage('* Debe ingresar el tamaño').bail()
    .isLength({min: 3, max: 45}).withMessage('* Debe ingresar una o más palabras para definir el tamaño del producto, entre 3 y 45 caracteres'),
    check('price').notEmpty().withMessage('* Debe ingresar el precio').bail()
    .isNumeric().withMessage('* Debe ingresar un numero entero sin punto ni coma'),
    check('stock').notEmpty().withMessage('* Debe ingresar el stock').bail()
    .isInt({ min: 0 }).withMessage('* El stock debe ser un número entero no negativo')
]


module.exports = {
    login,
    register,
    editProfile,
    changePassword,
    product
}