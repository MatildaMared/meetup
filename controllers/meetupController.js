async function createMeetup(req, res, next) {
	console.log(req);
	res.status(201).json({
		success: true,
	});
}

module.exports = { createMeetup };
