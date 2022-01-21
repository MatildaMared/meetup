const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("./../models/userModel");
const app = require("../index");
const api = supertest(app);

describe("Login API", () => {
	let userId;

	beforeAll(async () => {
		await User.deleteMany({});

		// Create a new user to test with
		const user = await User.create({
			username: "test",
			firstName: "Test",
			password: "test1234",
		});

		userId = user._id.toString();
	});

	describe("Login", () => {
		it("succeeds when provided a correct username and password", async () => {
			const login = {
				username: "test",
				password: "test1234",
			};

			const response = await api
				.post("/api/login")
				.send(login)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(response.body.user.username).toBe(login.username);
		});

		it("fails with status code 400 if username is missing", async () => {
			const login = {
				password: "test1234",
			};

			const response = await api
				.post("/api/login")
				.send(login)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe(
				"Please provide both username and password"
			);
		});

		it("fails with status code 400 if password is missing", async () => {
			const login = {
				username: "test",
			};

			const response = await api
				.post("/api/login")
				.send(login)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe(
				"Please provide both username and password"
			);
		});

		it("fails with status code 401 if password is incorrect", async () => {
			const login = {
				username: "test",
				password: "incorrectPassword123",
			};

			const response = await api
				.post("/api/login")
				.send(login)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Incorrect password");
		});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});
});
