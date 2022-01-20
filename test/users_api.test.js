const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("./../models/userModel");
const app = require("../index");
const api = supertest(app);

describe("Meetups API", () => {
	beforeAll(async () => {
		await User.deleteMany({});
	});

	describe("Creating a new user", () => {
		it("succeeds when provided a unique username and a password", async () => {
			const newUser = {
				username: "atara",
				firstName: "Matilda",
				password: "test1234",
			};

			const response = await api
				.post("/api/users")
				.send(newUser)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			expect(response.body.user.username).toBe(newUser.username);
		});

		it("fails with status code 400 if username is missing", async () => {
			const newUser = {
				firstName: "Greta",
				password: "test1234",
			};

			const response = await api
				.post("/api/users")
				.send(newUser)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Please enter a username");
		});

		it("fails with status code 400 if password is missing", async () => {
			const newUser = {
				username: "bollen",
				firstName: "Charles",
			};

			const response = await api
				.post("/api/users")
				.send(newUser)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Please enter a password");
		});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});
});
