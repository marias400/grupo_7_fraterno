const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
//middlewares
const auth = require('../middleware/auth');
const validations = require('../middleware/validations');
const areEmailAndPassInDB = require('../middleware/areEmailAndPassInDB');
const fileUploadUsers = require('../services/fileUploadUsers');

router.get("/login", auth.profileAuth, usersController.loginPage);
router.post("/login", auth.userInctiveAuth, validations.login, areEmailAndPassInDB.login, usersController.loginSuccesful);

router.get("/register", auth.userInctiveAuth, usersController.registerPage);
router.post("/register", fileUploadUsers.single('image'), validations.register, usersController.processRegister);

router.get("/profile", auth.userActiveAuth, usersController.profilePage);
router.post("/profile", auth.userActiveAuth, usersController.userLogout);
router.delete("/profile", auth.userActiveAuth, usersController.deleteUser);

router.get("/support", auth.userActiveAuth, usersController.supportPage);

router.get("/profile/info", auth.userActiveAuth, usersController.infoPage);
router.post("/profile/info", auth.userActiveAuth, validations.editProfile, usersController.infoUpdate);

router.get("/profile/orders", auth.userActiveAuth, usersController.ordersPage);

router.get("/profile/password", auth.userActiveAuth, usersController.passwordPage);
router.post("/profile/password", auth.userActiveAuth, areEmailAndPassInDB.editProfile, validations.changePassword, usersController.passwordUpdate);


module.exports = router;
