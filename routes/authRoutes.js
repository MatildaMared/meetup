const { Router } = require("express");
const router = new Router();
const authController = require("./../controllers/authController");

// Log in user
router.post("/", authController.login);

module.exports = router;
