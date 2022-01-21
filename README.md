# Nerdy Meetups

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

---

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
