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

async function getAllUsers(req, res, next) {
	try {
		const users = await User.find({});

		res.status(200).json({
			success: true,
			users,
		});
	} catch (err) {
		next(err);
	}
}

async function getUserById(req, res, next) {
	try {
		const id = req.params.id;

		const user = await User.findById(id);

		if (!user) {
			return next(new ErrorResponse(`User not found`, 404));
		}

		res.status(200).json({
			success: true,
			user,
		});
	} catch (err) {
		next(err);
	}
}

async function updateUser(req, res, next) {
	try {
		const id = req.params.id;
		const updates = req.body;

		const user = await User.findByIdAndUpdate(id, updates, {
			new: true,
			runValidators: true,
		});

		if (!user) {
			return next(new ErrorResponse(`User not found`, 404));
		}

		res.status(200).json({
			success: true,
			user,
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { createUser, getAllUsers, getUserById, updateUser };
