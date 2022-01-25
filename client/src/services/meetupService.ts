export async function fetchDataByUrl(url: string) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getAllMeetups() {
  const fetchUrl = "/api/meetups";
  return fetchDataByUrl(fetchUrl);
}

export async function getSingleMeetup(id: string) {
  const fetchUrl = `/api/meetups/${id}`;
  return fetchDataByUrl(fetchUrl);
}

export async function attendMeetup(
  meetupId: string,
  token: string,
  user: object
): Promise<object> {
  // const token = localStorage.getItem('token')

  const res = await fetch(`/api/meetups/${meetupId}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export async function leaveMeetup(
  meetupId: string,
  token: string,
  user: object
) {
  const res = await fetch(`/api/meetups/${meetupId}/register`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  console.log(data);
  return data;
}

export async function createMeetup(meetupObj: object, token: string) {
  const meetup = await fetch(`/api/meetups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(meetupObj),
  });

  const meetupData = await meetup.json();
  return meetupData;
}

export async function createComment(
  meetupId: string,
  token: string,
  comment: string,
) {
  const commentFetch = await fetch(`/api/meetups/${meetupId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  });

  const commentData = await commentFetch.json();
  console.log(commentData);
  
  return commentData;
}
