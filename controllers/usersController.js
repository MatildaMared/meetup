const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorResponse = require("./../utilities/errorResponse");

async function createUser(req, res, next) {
	try {
    const { username, firstName, password } = req.body;

		const user = await User.create({
			username,
			firstName,
			password,
		});

		res.status(201).json({
			success: true,
			user: user,
			token: user.getToken(),
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { createUser };
