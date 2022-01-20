async function createUser(req, res, next) {
	res.status(201).json({
		success: true,
	});
}

module.exports = { createUser };
