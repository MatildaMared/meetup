require("dotenv").config();
const config = require("./utilities/config");
const path = require("path");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const meetupRoutes = require("./routes/meetupRoutes");
const usersRoutes = require("./routes/usersRoutes");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 8000;

const app = express();

// Middlewares

app.use(cors());
app.use(express.json());

// Routes

app.get("/", (req, res) => {
	res.send("Hello world!");
});

app.use("/api/meetups", meetupRoutes);
app.use("/api/users", usersRoutes);

// Error Middleware
app.use(errorHandler);

// Start server and connect to DB

if (process.env.NODE_ENV !== "test") {
	app.listen(PORT, () => {
		console.log(`Server up and running on port ${PORT}... 💻`);
	});
}

mongoose
	.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to database... 📝");
	})
	.catch((err) => {
		console.log("There was an error connecting to database: ", err);
	});

module.exports = app;
