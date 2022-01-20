const { Router } = require("express");
const router = new Router();
const usersController = require("./../controllers/usersController");

// Create new user
router.post("/", usersController.createUser);

// Returns all users
router.get("/", usersController.getAllUsers);

// Returns single user
router.get("/:id", usersController.getUserById);

// Update user
router.put("/:id", usersController.updateUser);

module.exports = router;
