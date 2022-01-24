import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleMeetup } from "../../services/meetupService";
import { getUserById } from "../../services/userService";
import { Meetup } from "../../models/Meetup";
import { User } from "../../models/User";
import MeetupCard from "../../components/meetupcard/MeetupCard";
import Comment from "../../components/comment/Comment";

function MeetupPage() {
  const [singleMeetup, setSingleMeetup] = useState<Meetup | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { meetupid } = useParams();

  async function getMeetup(id: string) {
    const meetupInfo = await getSingleMeetup(id);
    setSingleMeetup(meetupInfo.meetup as Meetup);
  }

  useEffect(() => {
    getMeetup(meetupid as string);
  }, []);

  async function getUser(id: string) {
    const userInfo = await getUserById(id);
    setUser(userInfo.user);
  }

  useEffect(() => {
    if (singleMeetup?.ownerId) {
      getUser(singleMeetup?.ownerId as string);
    }
  }, [singleMeetup]);

  return (
    <>
      <MeetupCard meetup={singleMeetup as Meetup} user={user as User} />
      <Comment />
    </>
  );
}

export default MeetupPage;
