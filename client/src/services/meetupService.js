export async function fetchDataByUrl(url) {
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

export async function getSingleMeetup(id) {
  const fetchUrl = `http://localhost:8000/api/meetups/${id}`;
  return fetchDataByUrl(fetchUrl);
}
