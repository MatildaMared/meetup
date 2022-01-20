const { Router } = require("express");
const router = new Router();
const usersController = require("./../controllers/usersController");

// Create new user
router.post("/", usersController.createUser);

// Returns all user data
router.get("/", usersController.getAllUsers);

// Returns single user
router.get("/:id", usersController.getUserById);

module.exports = router;
