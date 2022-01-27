import { useParams } from "react-router-dom";
import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
} from "../../services/localStorageService";
import { attendMeetup, leaveMeetup } from "../../services/meetupService";
import styled from "styled-components";

interface Props {
  attending: boolean;
  setAttending: Function;
  setMeetup: Function;
}

function AttendButton({ attending, setAttending, setMeetup }: Props) {
  const token = getTokenFromLocalStorage();
  const thisUser = getUserFromLocalStorage();
  const { meetupid } = useParams();

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (attending === false && token && thisUser) {
      const res = await attendMeetup(
        meetupid as string,
        token as string,
        thisUser as object
      );
      console.log("attending!");
      setAttending(true);
      if (res.success === true) {
        setMeetup(res.meetup);
      }
    } else if (attending === true && token && thisUser) {
      const res = await leaveMeetup(
        meetupid as string,
        token as string,
        thisUser as object
      );
      console.log("Leave Meetup");
      setAttending(false);
      if (res.success === true) {
        setMeetup(res.meetup);
      }
    }
  };

  return (
    <div>
      <Button onClick={(e) => handleClick(e)}>
        {attending ? "Unattend Meetup" : "Attend Meetup"}
      </Button>
    </div>
  );
}

export default AttendButton;

const Button = styled.button`
  position: absolute;
  right: 1rem;
  top: 3.4rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  z-index: 5;
  background-color: #474747;
  color: #eee;
  padding: 4px 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #7e7e7e;
  }

  &:active {
    transform: scale(0.98);
  }
`;
