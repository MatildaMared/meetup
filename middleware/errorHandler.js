const ErrorResponse = require("../utilities/errorResponse");

const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	if (err.code === 11000) {
		const message = "Email is already registered";
		error = new ErrorResponse(message, 400);
	}

	if (err.message.includes("Cast to ObjectId failed")) {
		error = new ErrorResponse("Invalid ID", 400);
	}

	if (err.name === "ValidationError") {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse(message, 400);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Server error...",
	});
};

module.exports = errorHandler;
