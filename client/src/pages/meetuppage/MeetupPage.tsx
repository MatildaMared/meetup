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
import styled from "styled-components";

function MeetupPage() {
  const [singleMeetup, setSingleMeetup] = useState<Meetup | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [attending, setAttending] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { meetupid } = useParams();
  const token = getTokenFromLocalStorage();
  const thisUser = getUserFromLocalStorage();

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

  const amAttending = (): void => {
    singleMeetup?.attendees.map((attendees) => {
      if (attendees.id === thisUser?.id) {
        console.log(attendees.id, thisUser?.id);
        console.log("hello");
        setAttending(true);
      } else if (attendees.id !== thisUser?.id) {
        console.log("in else", attendees.id, thisUser?.id);
        setAttending(false);
      }
    });
  };
  console.log(thisUser);

  useEffect(() => {
    amAttending();
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <StyledPage>
      {isLoggedIn && (
        <Button>{attending ? "Leave meetup" : "Attend Meetup"}</Button>
      )}
      <MeetupCard meetup={singleMeetup as Meetup} user={user as User} />
      <Comment />
    </StyledPage>
  );
}

export default MeetupPage;

const StyledPage = styled.div`
  position: relative;
`;

const Button = styled.button`
  padding: 0.4rem 0.9rem;
  display: block;
  position: absolute;
  right: 22.4rem;
  top: 3.5rem;
  background-color: #fff;
  border: 2px solid lightblue;
  border-radius: 4px;
  color: lightblue;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: #eee;
  }

  &:active {
    transform: scale(0.98);
  }
`;
