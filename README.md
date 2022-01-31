# Nerdy Meetups

An app where you can sign up to log in and attend meetups with focus on programmning and gaming. The app is tested with Supertest on the backend and Jest on the frontend. It's written in Typescript and React. The programmers involved are MatildaMared, herv3us and sarablom and we created the app as an assignment for testing course in our Frontend development education.

## User stories

1. As a user/guest I want to initially see upcoming Meetups sorted after date so that I can see which Meetups is arranged in the future.
2. As a user/guest I want to be able to sort Meetups after category, so that it will be easier for me to find a Meetup that I like.
3. As a user/guest I want to be able to see the locatoion of the Meetup, to decide if I can go or not.
4. As a user/guest I want to be able to see the time of the Meetup, to decide if I can go or not.
5. As a user/guest I want to able to click on a Meetup to get more information about the event.
6. As a guest I want to be able to sign up so that I can create, edit, delete and attend Meetups.
7. As a user I want to be able to log in once I signed up, so that I can get hold of my personal information on all devices.
8. As a user I want to be able to sign up for a Meetup to keep track of which Meetups I am attending.
9. As a user I want to be able to unattend a Meetup if I can no longer go.
10. As a user I want to be able to comment a specific Meetup to discuss the Meetup.
11. As a user I want to be able to delete my own comments if I regret posting a comment.
12. As a user I want to be able to sort Meetups so that I can see which Meetups I am attending.
13. As a user I want to be able to see which other users has signed up for the Meetup to see if someone I know is coming to the Meetup.
14. As a user I want to be able to create new Meetups so that other people can attend them.
15. As the creator of a Meetup I want to be able to delete all comment from the Meetup page if there are inappropriate discussions.
16. As the creator of a Meetup I am not allowed to edit an ongoing or passed meeting, since it has already taken place.
17. As the creator of a Meetup I want to able to edit my own Meetup in case I need to do some updates.
18. As the creator of a Meetup I want to be able to see my created Meetups so that I can keep track of which Meetups I am arranging.

## To run the app

1. Get the correct information and install the .env file (if you get permission from us)
2. Type `npm run dev` in the root folder
3. Type `npm run start` in the client folder
4. For tests: `npm run test` in both root and client folder

## API routes

### User routes

---

POST request to `/api/users`

Creates a new user

---

PUT request to `/api/users`

Updates user with data from request body. Requires JWT to be sent in Authorization header. Can only be done by the creator of the user.

---

POST request to `/api/login`

Logs the user in. Requires an object with username and password. Sends back a JWT token to save in frontend.

---

### Meetup routes

---

GET request to `/api/meetups`

Returns all meetups

---

GET request to `/api/meetups/:meetupId`

Returns a single meetup based on it's ID

---

POST request to `/api/meetups`

Creates a new meetup with data from request body. Requires JWT to be sent in Authorization header.

---

PUT request to `/api/meetups/:meetupId`

Updates a single meetup with data from request body. Requires JWT to be sent in Authorization header. Can only be done by the creator of the meetup.

---

DELETE request to `/api/meetups/:meetupId`

Deletes a single meetup. Requires JWT to be sent in Authorization header. Can only be done by the creator of the meetup.

---us

POST request to `/api/meetups/:meetupId/comments`

Creates a new comment for the meetup corresponding to the meetup ID in the url. Requires JWT to be sent in Authorization header.

---

DELETE request to `/api/meetups/:meetupId/comments/:commentId`

Deletes a comment from a meetup. Requires JWT to be sent in Authorization header. Can only be done by the creator of the meetup or the creator of the comment.

---

POST request to `/api/meetups/:meetupId/register`

Registers a user as attendant of a meetup. Requires JWT to be sent in Authorization header.

---

DELETE request to `/api/meetups/:meetupId/register`

Unregisters a user from attending a meetup. Requires JWT to be sent in Authorization header. Can only be done by the registered user.
