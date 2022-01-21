const { Router } = require("express");
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

module.exports = router;
