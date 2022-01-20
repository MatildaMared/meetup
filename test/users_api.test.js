const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("./../models/userModel");
const app = require("../index");
const api = supertest(app);

describe("Meetups API", () => {
	beforeAll(async () => {
		// Delete all meetups from database
		await User.deleteMany({});
	});

	it("succeeds when provided a unique username and a password", async () => {
		const newUser = {
			username: "atara",
			password: "test1234",
		};

		const response = await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		console.log(response.data);
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});
});
