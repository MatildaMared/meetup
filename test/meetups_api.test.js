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

	describe("Getting all meetups", () => {
		const meetup = {
			title: "Example",
			category: "gaming",
			description: "This is a description",
			date: new Date("2022-03-08T17:00:00"),
			location: "location",
			imgUrl: "http://url.com",
		};

		const anotherMeetup = {
			title: "Another",
			category: "gaming",
			description: "This is a description",
			date: new Date("2022-04-13T17:00:00"),
			location: "location",
			imgUrl: "http://url.com",
		};

		beforeAll(async () => {
			await Meetup.deleteMany({});

			await api
				.post("/api/meetups/")
				.send(meetup)
				.set("Authorization", `Bearer ${token}`)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			await api
				.post("/api/meetups/")
				.send(anotherMeetup)
				.set("Authorization", `Bearer ${token}`)
				.expect(201)
				.expect("Content-Type", /application\/json/);
		});

		it("succeeds if provided all necessary data", async () => {
			const response = await api
				.get("/api/meetups/")
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(response.body.meetups.length).toBe(2);

			const titles = response.body.meetups.map((m) => m.title);

			expect(titles).toContain(meetup.title);
			expect(titles).toContain(anotherMeetup.title);
		});
	});

	describe("Getting a specific meetup", () => {
		let meetupId;

		const meetup = {
			title: "Example",
			category: "gaming",
			description: "This is a description",
			date: new Date("2022-03-08T17:00:00"),
			location: "location",
			imgUrl: "http://url.com",
		};

		beforeAll(async () => {
			await Meetup.deleteMany({});

			const response = await api
				.post("/api/meetups/")
				.send(meetup)
				.set("Authorization", `Bearer ${token}`)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			meetupId = response.body.meetup.id;
		});

		it("succeeds if provided all necessary data", async () => {
			const response = await api
				.get(`/api/meetups/${meetupId}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(response.body.meetup.title).toBe(meetup.title);
		});

		it("fails with status code 400 if id is invalid", async () => {
			const wrongId = "wrongId683";
			const response = await api
				.get(`/api/meetups/${wrongId}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid ID");
		});
	});

	describe("Updating a meetup", () => {
		let meetupId;

		const meetup = {
			title: "Example",
			category: "gaming",
			description: "This is a description",
			date: new Date("2022-03-08T17:00:00"),
			location: "location",
			imgUrl: "http://url.com",
		};

		beforeAll(async () => {
			await Meetup.deleteMany({});

			const response = await api
				.post("/api/meetups/")
				.send(meetup)
				.set("Authorization", `Bearer ${token}`)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			meetupId = response.body.meetup.id;
		});

		it("succeeds if provided all necessary data", async () => {
			const updates = {
				title: "I'm updated",
			};

			const response = await api
				.put(`/api/meetups/${meetupId}`)
				.send(updates)
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(response.body.meetup.title).toBe(updates.title);
		});

		it("fails with status code 400 if id is invalid", async () => {
			const invalidId = "notCorrect394";

			const updates = {
				title: "Updated",
			};

			const response = await api
				.put(`/api/meetups/${invalidId}`)
				.send(updates)
				.set("Authorization", `Bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid ID");
		});

		it("fails with status code 400 if token is missing", async () => {
			const updates = {
				title: "Newtitle",
			};

			const response = await api
				.put(`/api/meetups/${meetupId}`)
				.send(updates)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Token missing");
		});
	});

	describe("Deleting a meetup", () => {
		let meetupId;

		const meetup = {
			title: "Will be deleted",
			category: "gaming",
			description: "description",
			date: new Date("2022-03-08T17:00:00"),
			location: "location",
			imgUrl: "http://url.com",
		};

		beforeEach(async () => {
			await Meetup.deleteMany({});

			const response = await api
				.post("/api/meetups/")
				.send(meetup)
				.set("Authorization", `Bearer ${token}`)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			meetupId = response.body.meetup.id;
		});

		it("succeeds provided all necessary information", async () => {
			const response = await api
				.delete(`/api/meetups/${meetupId}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(response.body.message).toBe("Meetup deleted");

			const allMeetups = await Meetup.find({});
			expect(allMeetups.length).toBe(0);
		});

		it("fails with status code 400 if id is invalid", async () => {
			const invalidId = "wrong892";

			const response = await api
				.delete(`/api/meetups/${invalidId}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid ID");
		});

		it("fails with status code 400 if token is missing", async () => {
			const response = await api
				.delete(`/api/meetups/${meetupId}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Token missing");
		});

		it("fails with status code 404 if meetup is already deleted", async () => {
			await Meetup.findByIdAndDelete(meetupId);

			const response = await api
				.delete(`/api/meetups/${meetupId}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(404)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Meetup not found");
		});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});
});
