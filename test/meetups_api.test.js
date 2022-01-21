const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);
const User = require("../models/userModel");
const Meetup = require("../models/meetupModel");

describe("Meetups API", () => {
	let token;
	let userId;

	beforeAll(async () => {
		await User.deleteMany({});
		await Meetup.deleteMany({});

		const user = await User.create({
			username: "test",
			firstName: "Test",
			password: "test1234",
		});

		const response = await api
			.post("/api/login")
			.send({ username: "test", password: "test1234" })
			.expect(200)
			.expect("Content-Type", /application\/json/);

		token = response.body.token;
		userId = response.body.user.id;
	});

	describe("Creating new meetup", () => {
		const exampleMeetup = {
			title: "Meetup",
			category: "programming",
			description: "This is a description",
			date: new Date("2022-02-18T18:00:00"),
			location: "Mr Cake, Lilla Badhusgatan 2b, Göteborg",
			imgUrl: "http://url.com",
		};

		it("succeeds if provided all necessary data", async () => {
			const response = await api
				.post("/api/meetups/")
				.send(exampleMeetup)
				.set("Authorization", `Bearer ${token}`)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			expect(response.body.meetup.title).toBe(exampleMeetup.title);
		});

		it("fails with status code 400 if token is missing", async () => {
			const response = await api
				.post("/api/meetups/")
				.send(exampleMeetup)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Token missing");
		});

		it("fails with status code 401 if token is invalid", async () => {
			const invalidToken = "invalidToken765";

			const response = await api
				.post("/api/meetups/")
				.send(exampleMeetup)
				.set("Authorization", `Bearer ${invalidToken}`)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid token");
		});

		it("fails with status code 400 if title is missing", async () => {
			const response = await api
				.post("/api/meetups/")
				.send({ ...exampleMeetup, title: null })
				.set("Authorization", `Bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Please enter a title");
		});

		it("fails with status code 400 if category is missing", async () => {
			const response = await api
				.post("/api/meetups/")
				.send({ ...exampleMeetup, category: null })
				.set("Authorization", `Bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Please choose a category");
		});

		it("fails with status code 400 if date is missing", async () => {
			const response = await api
				.post("/api/meetups/")
				.send({ ...exampleMeetup, date: null })
				.set("Authorization", `Bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Please enter a date");
		});

		it("fails with status code 400 if location is missing", async () => {
			const response = await api
				.post("/api/meetups/")
				.send({ ...exampleMeetup, location: null })
				.set("Authorization", `Bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Please enter a location");
		});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});
});
