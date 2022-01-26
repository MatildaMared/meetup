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
}

function AttendButton({ attending, setAttending }: Props) {
  const token = getTokenFromLocalStorage();
  const thisUser = getUserFromLocalStorage();
  const { meetupid } = useParams();

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (attending === false && token && thisUser) {
      await attendMeetup(
        meetupid as string,
        token as string,
        thisUser as object
      );
      console.log("attending!");
      setAttending(true);
    } else if (attending === true && token && thisUser) {
      await leaveMeetup(
        meetupid as string,
        token as string,
        thisUser as object
      );
      console.log("Leave Meetup");
      setAttending(false);
    }
  };

  return (
    <div>
      <Button onClick={(e) => handleClick(e)}>
        {attending ? "Leave Meetup" : "Attend Meetup"}
      </Button>
    </div>
  );
}

export default AttendButton;

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
