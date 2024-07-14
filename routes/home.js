const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');


router.get("/home", homeController.homePage);
router.get("/", homeController.homePage);

module.exports = router;