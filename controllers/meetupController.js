async function createMeetup(req, res, next) {
	res.status(201).json({
		success: true,
	});
}

module.exports = { createMeetup };
