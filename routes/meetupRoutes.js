const { Router } = require("express");
const router = new Router();
const meetupController = require("./../controllers/meetupController");

// Create new meetup
router.post("/", meetupController.createMeetup);

module.exports = router;
