const mongoose = require("mongoose");

const meetupSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Please enter a title"],
	},
	ownerId: {
		type: String,
		required: [true, "Owner ID required"],
	},
	category: {
		type: String,
		required: [true, "Please choose a category"],
	},
	description: {
		type: String,
	},
	date: {
		type: Date,
		required: [true, "Please enter a date"],
	},
	location: {
		type: String,
		required: [true, "Please enter a location"],
	},
	imageUrl: {
		type: String,
	},
	attendees: Array,
	comments: Array,
});

meetupSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Meetup = mongoose.model("Meetup", meetupSchema);

module.exports = Meetup;
