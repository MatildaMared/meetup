export async function fetchDataByUrl(url: string) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getAllMeetups() {
  const fetchUrl = "http://localhost:8000/api/meetups";
  return fetchDataByUrl(fetchUrl);
}

export async function getSingleMeetup(id: string) {
  const fetchUrl = `http://localhost:8000/api/meetups/${id}`;
  return fetchDataByUrl(fetchUrl);
}

export async function createMeetup(
  meetupObj: object,
  token: string
): Promise<object> {
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
