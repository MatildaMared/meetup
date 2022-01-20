require("dotenv").config();
const config = require("./utilities/config");
const path = require("path");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const meetupRoutes = require("./routes/meetupRoutes");
const PORT = process.env.PORT || 8000;

const app = express();

// ### MIDDLEWARES ###

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));

// ### ROUTES ###

app.get("/", (req, res) => {
	res.send("Hello!");
});

app.use("/api/meetups", meetupRoutes);

// ### START SERVER AND CONNECT TO DB ###

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
