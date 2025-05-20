const express = require("express");
const router = express.Router();
const authController = require("../controler/authcontroler");


router.post("/login", authController.login);

router.post("/user", authController.userinfo)

router.post("/signup", authController.signup);

module.exports = router;
