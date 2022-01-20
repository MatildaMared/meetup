const { Router } = require("express");
const router = new Router();
const usersController = require("./../controllers/usersController");

// Create new user
router.post("/", usersController.createUser);

module.exports = router;
