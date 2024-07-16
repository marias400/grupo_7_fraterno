const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get("/", homeController.homePage);
router.get("/home", homeController.homePage);
router.get("/about", homeController.aboutPage);

module.exports = router;