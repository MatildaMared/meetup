const ErrorResponse = require("./../utilities/errorResponse");
const User = require("./../models/userModel");
const Meetup = require("./../models/meetupModel");

async function createMeetup(req, res, next) {
	try {
		const meetup = req.body;

		const user = await User.findById(req.userId);

		if (!user) {
			return next(new ErrorResponse("User not found", 404));
		}

		meetup.ownerId = req.userId;
		meetup.attendees = [{ id: req.userId, name: user.firstName }];

		const newMeetup = await Meetup.create(meetup);

		user.attending = [...user.attending, newMeetup._id.toString()];
		await user.save();

		res.status(201).json({
			success: true,
			meetup: newMeetup,
			user: user,
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { createMeetup };
