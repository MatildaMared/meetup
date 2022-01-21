const { Router } = require("express");
const { post } = require("..");
const router = new Router();
const meetupController = require("./../controllers/meetupController");
const tokenHandler = require("./../middleware/tokenHandler");

// Create new meetup
router.post("/", tokenHandler, meetupController.createMeetup);

// Get all meetups
router.get("/", meetupController.getAllMeetups);

// Get meetup by id
router.get("/:id", meetupController.getMeetupById);

// Update meetup
router.put("/:id", tokenHandler, meetupController.updateMeetup);

// Delete meetup
router.delete("/:id", tokenHandler, meetupController.deleteMeetup);

// Adding a comment
router.post("/:id/comments", tokenHandler, meetupController.addComment);

// Deleting a comment
router.delete(
	"/:id/comments/:commentId",
	tokenHandler,
	meetupController.deleteComment
);

// Registering to a meetup
router.post("/:id/register", tokenHandler, meetupController.registerToMeetup);

// Unregistering from a meetup
router.delete(
	"/:id/register",
	tokenHandler,
	meetupController.unregisterFromMeetup
);

module.exports = router;
