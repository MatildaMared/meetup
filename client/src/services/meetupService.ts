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

export async function attendMeetup(meetupId: string, userId: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(`/api/${meetupId}/register`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
  });
  const data = await res.json();
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
