const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorResponse = require("./../utils/errorResponse");

async function createUser(req, res, next) {
	try {
		console.log(req.body);
		const { username, password } = req.body;
		res.status(201).json({
			success: true,
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { createUser };
