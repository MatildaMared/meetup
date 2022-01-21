const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);
const User = require("../models/userModel");
const Meetup = require("../models/meetupModel");

describe("Meetup API", () => {
	let token;
	let meetupId;

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

		const meetup = {
			title: "Comment me",
			category: "programming",
			description: "This is a description",
			date: new Date("2022-02-18T18:00:00"),
			location: "online",
			imgUrl: "http://url.com",
		};

		const createdMeetup = await api
			.post("/api/meetups/")
			.send(meetup)
			.set("Authorization", `Bearer ${token}`)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		meetupId = createdMeetup.body.meetup.id;
	});

	describe("Registering to a meetup", () => {
		const newUser = {
			username: "kjelle",
			firstName: "Kjell-Åke",
			password: "test1234",
		};

		beforeEach(async () => {
			await User.deleteOne({ username: "kjelle" });

			const response = await api
				.post("/api/users")
				.send(newUser)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			token = response.body.token;
		});

		it("succeeds if provided all necessary data", async () => {
			const response = await api
				.post(`/api/meetups/${meetupId}/register`)
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const attendeesNames = response.body.meetup.attendees.map(
				(attendee) => attendee.name
			);

			expect(attendeesNames).toContain(newUser.firstName);
		});

		it("fails if user is already registered", async () => {
			await api
				.post(`/api/meetups/${meetupId}/register`)
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const response = await api
				.post(`/api/meetups/${meetupId}/register`)
				.set("Authorization", `Bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("User already registered");
		});

		it("fails with status code 400 if token is missing", async () => {
			const response = await api
				.post(`/api/meetups/${meetupId}/register`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Token missing");
		});

		it("fails with status code 401 if token is invalid", async () => {
			const invalidToken = "willNotWork384";

			const response = await api
				.post(`/api/meetups/${meetupId}/register`)
				.set("Authorization", `Bearer ${invalidToken}`)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid token");
		});

		it("fails with status code 400 if meetup id is invalid", async () => {
			const invalidMeetupId = "invalid902";

			const response = await api
				.post(`/api/meetups/${invalidMeetupId}/register`)
				.set("Authorization", `Bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid ID");
		});
	});

	describe("Unregistering from a meetup", () => {
		const newUser = {
			username: "kakan",
			firstName: "Pernilla",
			password: "test1234",
		};

		beforeEach(async () => {
			await User.deleteOne({ username: "kakan" });

			const response = await api
				.post("/api/users")
				.send(newUser)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			token = response.body.token;

			await api
				.post(`/api/meetups/${meetupId}/register`)
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);
		});

		it("succeeds if provided all necessary data", async () => {
			const response = await api
				.delete(`/api/meetups/${meetupId}/register`)
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const attendeesNames = response.body.meetup.attendees.map(
				(attendee) => attendee.name
			);

			expect(attendeesNames).not.toContain(newUser.firstName);
		});

		it("fails with status code 400 if token is missing", async () => {
			const response = await api
				.delete(`/api/meetups/${meetupId}/register`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Token missing");
		});

		it("fails with status code 401 if token is invalid", async () => {
			const invalidToken = "willNotWork78390";

			const response = await api
				.delete(`/api/meetups/${meetupId}/register`)
				.set("Authorization", `Bearer ${invalidToken}`)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid token");
		});

		it("fails with status code 400 if meetup ID is invalid", async () => {
			const invalidMeetupId = "invalid9527";

			const response = await api
				.delete(`/api/meetups/${invalidMeetupId}/register`)
				.set("Authorization", `Bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid ID");
		});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});
});
