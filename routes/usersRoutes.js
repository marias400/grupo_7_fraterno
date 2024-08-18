const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const loginValidations = require("../middleware/loginValidations");
const userActiveAuth = require("../middleware/userActiveAuth");
const profileAuth = require("../middleware/profileAuth");
const userInctiveAuth = require("../middleware/userInactiveAuth");

router.get("/login", profileAuth, usersController.loginPage);
router.post("/login", userInctiveAuth, loginValidations, usersController.loginSuccesful);
router.get("/register", userInctiveAuth, usersController.registerPage);
router.get("/profile", userActiveAuth, usersController.profilePage);

module.exports = router;
