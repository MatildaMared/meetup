const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("./../models/userModel");
const app = require("../index");
const api = supertest(app);

describe("Meetups API", () => {
	let userId;
	let token;

	beforeAll(async () => {
		jest.setTimeout(60000);
		await User.deleteMany({});

		// Create a new user to test with
		const user = await User.create({
			username: "test",
			firstName: "Test",
			password: "test1234",
		});

		const response = await api
			.post("/api/login")
			.send({
				username: "test",
				password: "test1234",
			})
			.expect(200)
			.expect("Content-Type", /application\/json/);

		userId = response.body.user.id.toString();
		token = response.body.token;
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

	describe("Getting all user data", () => {
		it("returns user data", async () => {
			const response = await api
				.get("/api/users")
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const userIds = response.body.users.map((user) => user.id.toString());
			expect(userIds).toContain(userId);
		});
	});

	describe("Getting data for single user", () => {
		it("returns user data", async () => {
			const response = await api
				.get(`/api/users/${userId}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(response.body.user.id).toBe(userId);
		});

		it("fails with status code 400 if id is invalid", async () => {
			const invalidId = 123;

			const response = await api
				.get(`/api/users/${invalidId}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid ID");
		});

		it("fails with status code 404 if user could not be found", async () => {
			const userToDelete = {
				username: "willbedeleted",
				firstName: "Will",
				password: "test1234",
			};

			const user = await User.create(userToDelete);
			const userId = user._id.toString();

			await User.findByIdAndDelete(userId);

			const response = await api
				.get(`/api/users/${userId}`)
				.expect(404)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("User not found");
		});
	});

	describe("Updating user data", () => {
		beforeAll(async () => {
			let userId;
			let token;

			const newUser = {
				username: "saxon",
				firstName: "Will change this",
				password: "test1234",
			};

			const user = await User.create(newUser);

			const loggedInUser = await api.post("/api/login").send({
				username: "saxon",
				password: "test1234",
			});

			userId = loggedInUser.body.user.id.toString();
			token = loggedInUser.body.token;
		});

		it("succeeds when provided a valid id and new data", async () => {
			const updates = {
				firstName: "Sixten",
			};

			const response = await api
				.put(`/api/users/${userId}`)
				.send(updates)
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(response.body.user.firstName).toBe(updates.firstName);
		});

		it("fails with status code 400 if there is no user with that ID", async () => {
			const invalidId = 123;

			const updates = {
				firstName: "Agaton",
			};

			const response = await api
				.put(`/api/users/${invalidId}`)
				.send(updates)
				.set("Authorization", `Bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid ID");
		});

		it("fails with status code 400 if token is missing", async () => {
			const updates = {
				firstName: "Svea",
			};

			const response = await api
				.put(`/api/users/${userId}`)
				.send(updates)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Token missing");
		});

		it("fails with status code 401 if token is invalid", async () => {
			const invalidToken = "invalidToken123";

			const updates = {
				firstName: "Rakel",
			};

			const response = await api
				.put(`/api/users/${userId}`)
				.send(updates)
				.set("Authorization", `Bearer ${invalidToken}`)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid token");
		});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});
});
