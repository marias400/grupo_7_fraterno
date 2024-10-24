const express = require("express");
const router = express.Router();
const userApi = require("../../controllers/api/userApi");


router.get("/users", userApi.userCount)
router.get("/users/:id", userApi.userById)

module.exports = router;