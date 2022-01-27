import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleMeetup } from "../../services/meetupService";
import { getUserById } from "../../services/userService";
import { Meetup } from "../../models/Meetup";
import { User } from "../../models/User";
import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
} from "../../services/localStorageService";
import MeetupCard from "../../components/meetupcard/MeetupCard";
import Comment from "../../components/comment/Comment";
import AttendButton from "../../components/attendMeetup/AttendButton";
import Attendees from "../../components/attendees/Attendees";
import styled from "styled-components";

function MeetupPage() {
  const [singleMeetup, setSingleMeetup] = useState<Meetup | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [attending, setAttending] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { meetupid } = useParams();
  const token = getTokenFromLocalStorage();

  async function getMeetup(id: string) {
    const meetupInfo = await getSingleMeetup(id);
    setSingleMeetup(meetupInfo.meetup as Meetup);
  }

  useEffect(() => {
    getMeetup(meetupid as string);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  async function getUser(id: string) {
    const userInfo = await getUserById(id);
    setUser(userInfo.user);
  }

  useEffect(() => {
    if (singleMeetup?.ownerId) {
      getUser(singleMeetup?.ownerId as string);

      const user = getUserFromLocalStorage();
      const id = user?.id;

      if (singleMeetup.attendees.length > 0) {
        singleMeetup.attendees.map((attend) => {
          if (attend.id === id) {
            setAttending(true);
          }
        });
      } else {
        setAttending(false);
      }
    }
  }, [singleMeetup]);

  return (
    <StyledPage>
      {isLoggedIn && (
        <AttendButton
          attending={attending}
          setAttending={setAttending}
          setMeetup={setSingleMeetup}
        />
      )}
      <MeetupCard meetup={singleMeetup as Meetup} user={user as User} />
      <Comment meetup={singleMeetup as Meetup} setMeetup={setSingleMeetup} />
      <Attendees meetup={singleMeetup as Meetup} />
    </StyledPage>
  );
}

export default MeetupPage;

const StyledPage = styled.div`
  position: relative;
  margin: 0 auto;
`;
