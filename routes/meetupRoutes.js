const { Router } = require("express");
const router = new Router();
const meetupController = require("./../controllers/meetupController");
const tokenHandler = require("./../middleware/tokenHandler");

// Create new meetup
router.post("/", tokenHandler, meetupController.createMeetup);

module.exports = router;
