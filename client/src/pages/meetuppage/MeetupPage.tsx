import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleMeetup } from "../../services/meetupService";
import { Meetup } from "../../models/Meetup";
import MeetupCard from "../../components/meetupcard/MeetupCard";
import Comment from "../../components/comment/Comment";

function MeetupPage() {
  const [singleMeetup, setSingleMeetup] = useState<Meetup | null>(null);
  const { meetupid } = useParams();

  async function getMeetup(id: string) {
    const meetupInfo = await getSingleMeetup(id);
    console.log(meetupInfo);
    setSingleMeetup(meetupInfo.meetup as Meetup);
  }

  useEffect(() => {
    getMeetup(meetupid as string);
  }, []);

  return (
    <>
      <MeetupCard meetup={singleMeetup as Meetup} />
      <Comment />
    </>
  );
}

export default MeetupPage;
