const express = require("express");
const router = express.Router();
const userController = require("../controler/usercontroler");
const authenticate = require("../middleware/authmiddleware");

router.post("/refresh", authenticate ,userController.refresh) 

router.post("/chatroom",authenticate, userController.sendmessage) 

router.post("/search",authenticate, userController.search)

router.get("/contacts",authenticate, userController.showcontacts)

router.post("/settings",authenticate, userController.settings)

module.exports = router;


