const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
//middlewares
const auth = require('../middleware/auth')
const validations = require('../middleware/validations')
const fileUploadUsers = require('../services/fileUploadUsers');

router.get("/login", auth.profileAuth, usersController.loginPage);
router.post("/login", auth.userInctiveAuth, validations.login, usersController.loginSuccesful);
router.get("/register", auth.userInctiveAuth, usersController.registerPage);
router.post("/register", fileUploadUsers.single('image'), validations.register, usersController.processRegister);
router.get("/profile", auth.userActiveAuth, usersController.profilePage);
router.post("/profile", auth.userActiveAuth, usersController.userLogout);

module.exports = router;
