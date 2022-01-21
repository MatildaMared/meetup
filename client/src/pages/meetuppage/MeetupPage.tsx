import MeetupCard from "../../components/meetupcard/MeetupCard";
import { Meetups } from "../../models/Events";
import { getSingleMeetup } from "../../services/meetupService";
import { useEffect, useState } from "react";

function EventPage() {
  const [meetup, setMeetup] = useState<null | Meetups>(null);

  async function getMeetup(id: string) {
    const meetupInfo = await getSingleMeetup(id);
    setMeetup(meetupInfo);
  }

  useEffect(() => {
    getMeetup("61ea80bcfe705abdc1db26e4");
    console.log(meetup);
  }, []);

  return <div>{meetup ? meetup : null}</div>;
}

export default EventPage;
