const express = require("express");
const router = express.Router();
const userApi = require("../../controllers/api/userApi");


router.get("/users", userApi.userCount)

module.exports = router;