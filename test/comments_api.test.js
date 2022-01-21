const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);
const User = require("../models/userModel");
const Meetup = require("../models/meetupModel");

describe("Commenting on a meetup", () => {
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

	describe("Adding a new comment", () => {
		const comment = {
			content: "This is a comment",
		};

		it("succeeds if provided all necessary data", async () => {
			const response = await api
				.post(`/api/meetups/${meetupId}/comments`)
				.send(comment)
				.set("Authorization", `Bearer ${token}`)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			const comments = response.body.meetup.comments.map(
				(comment) => comment.content
			);

			expect(comments).toContain(comment.content);
		});

		it("fails with status code 400 if token is missing", async () => {
			const response = await api
				.post(`/api/meetups/${meetupId}/comments`)
				.send(comment)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Token missing");
		});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});
});