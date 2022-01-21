const mongoose = require("mongoose");
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

		res.status(201).json({
			success: true,
			meetup: newMeetup,
			user: user,
		});
	} catch (err) {
		next(err);
	}
}

async function getAllMeetups(req, res, next) {
	try {
		const meetups = await Meetup.find({});

		res.status(200).json({
			success: true,
			meetups: meetups,
		});
	} catch (err) {
		next(err);
	}
}

async function getMeetupById(req, res, next) {
	try {
		const meetupId = req.params.id;

		const meetup = await Meetup.findById(meetupId);

		if (!meetup) {
			return next(new ErrorResponse("Meetup not found", 404));
		}

		res.status(200).json({
			success: true,
			meetup: meetup,
		});
	} catch (err) {
		next(err);
	}
}

async function updateMeetup(req, res, next) {
	try {
		const meetupId = req.params.id;

		const meetup = await Meetup.findById(meetupId);

		if (!meetup) {
			return next(new ErrorResponse("Meetup not found", 404));
		}

		if (meetup.ownerId !== req.userId) {
			return next(new ErrorResponse("Not authorized", 401));
		}

		const updatedMeetup = await Meetup.findByIdAndUpdate(meetupId, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			success: true,
			meetup: updatedMeetup,
		});
	} catch (err) {
		next(err);
	}
}

async function deleteMeetup(req, res, next) {
	try {
		const meetupId = req.params.id;

		const meetup = await Meetup.findById(meetupId);

		if (!meetup) {
			return next(new ErrorResponse("Meetup not found", 404));
		}

		if (meetup.ownerId !== req.userId) {
			return next(new ErrorResponse("Not authorized", 401));
		}

		await Meetup.findByIdAndDelete(meetupId);

		const user = await User.findById(req.userId);

		res.status(200).json({
			success: true,
			message: "Meetup deleted",
			user: user,
		});
	} catch (err) {
		next(err);
	}
}

async function addComment(req, res, next) {
	try {
		const meetupId = req.params.id;

		const meetup = await Meetup.findById(meetupId);

		if (!meetup) {
			return next(new ErrorResponse("Meetup not found", 404));
		}

		const comment = req.body;

		comment.userId = req.userId;

		comment.id = new mongoose.Types.ObjectId();

		meetup.comments = [...meetup.comments, comment];

		await meetup.save();

		res.status(201).json({
			success: true,
			meetup: meetup,
		});
	} catch (err) {
		next(err);
	}
}

module.exports = {
	createMeetup,
	getAllMeetups,
	getMeetupById,
	updateMeetup,
	deleteMeetup,
	addComment,
};
