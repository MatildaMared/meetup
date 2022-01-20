require("dotenv").config();
const config = require("./utilities/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const meetupRoutes = require("./routes/meetupRoutes");

const PORT = process.env.PORT || 8000;

const app = express();

const logger = (req, res, next) => {
	console.log(req);
	next();
};

// Middlewares
app.use(cors);
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/meetups", meetupRoutes);
app.get("/", (req, res) => {
	res.send("Hej");
});

if (process.env.NODE_ENV !== "test") {
	app.listen(PORT, () => {
		console.log(`Server up and running on port ${PORT} 🎮`);
	});
}

mongoose
	.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to database 🦄!");
	})
	.catch((err) => {
		console.log("There was an error connecting to database 💩", err);
	});

module.exports = app;
