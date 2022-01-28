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
import Header from "../../components/header/Header";
import MeetupCard from "../../components/meetupcard/MeetupCard";
import Comment from "../../components/comment/Comment";
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
    <>
      <Header />
      <StyledPage>
        <MeetupCard
          meetup={singleMeetup as Meetup}
          user={user as User}
          attending={attending}
          setAttending={setAttending}
          isLoggedIn={isLoggedIn}
          setSingleMeetup={setSingleMeetup}
        />
        <Comment meetup={singleMeetup as Meetup} setMeetup={setSingleMeetup} />
      </StyledPage>
    </>
  );
}

export default MeetupPage;

const StyledPage = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
`;
