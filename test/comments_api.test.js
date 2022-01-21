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
		jest.setTimeout(60000);
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

		it("fails with status code 400 if meetup id is invalid", async () => {
			const invalidId = "badId839";

			const response = await api
				.post(`/api/meetups/${invalidId}/comments`)
				.send(comment)
				.set("Authorization", `Bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid ID");
		});
	});

	describe("Deleting a comment", () => {
		let commentId;

		beforeEach(async () => {
			const comment = {
				content: "Delete me",
			};

			const response = await api
				.post(`/api/meetups/${meetupId}/comments`)
				.send(comment)
				.set("Authorization", `Bearer ${token}`)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			commentId = response.body.meetup.comments.at(-1).id;
		});

		it("succeeds if provided all necessary data", async () => {
			const response = await api
				.delete(`/api/meetups/${meetupId}/comments/${commentId}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const commentIds = response.body.meetup.comments.map(
				(comment) => comment.id
			);

			expect(commentIds).not.toContain(commentId);
		});

		it("fails with status code 400 if token is missing", async () => {
			const response = await api
				.delete(`/api/meetups/${meetupId}/comments/${commentId}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Token missing");
		});

		it("fails with status code 400 if meetup id is invalid", async () => {
			const invalidId = "badId839";

			const response = await api
				.delete(`/api/meetups/${invalidId}/comments/${commentId}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid ID");
		});

		it("fails with status code 404 if comment could not be found", async () => {
			const invalidId = "badId839";

			const response = await api
				.delete(`/api/meetups/${meetupId}/comments/${invalidId}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(404)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Comment not found");
		});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});
});
