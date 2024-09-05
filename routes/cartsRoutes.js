const express = require('express');
const cartsController = require('../controllers/cartsController');
const router = express.Router();

router.get('/list', cartsController.list);

module.exports = router;