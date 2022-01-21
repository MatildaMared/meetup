const { Router } = require("express");
const router = new Router();
const usersController = require("./../controllers/usersController");
const tokenHandler = require("./../middleware/tokenHandler");

// Create new user
router.post("/", usersController.createUser);

// Returns all users
router.get("/", usersController.getAllUsers);

// Returns single user
router.get("/:id", usersController.getUserById);

// Update user
router.put("/:id", tokenHandler, usersController.updateUser);

module.exports = router;
