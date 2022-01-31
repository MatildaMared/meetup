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
      {attending ? (
        <UnattendButton onClick={(e) => handleClick(e)}>
          Unattend Meetup
        </UnattendButton>
      ) : (
        <AttendingButton onClick={(e) => handleClick(e)}>
          Attend Meetup
        </AttendingButton>
      )}
    </div>
  );
}

export default AttendButton;

const BaseButton = styled.button`
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  color: #eee;
  cursor: pointer;
  margin: 1rem 0;
  padding: 1rem 2rem;
  transition: all 0.3s;
  width: fit-content;
  z-index: 5;

  &:hover {
    background-color: #7e7e7e;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 560px) {
    padding: 0.6rem 1.2rem;
  }
`;

const AttendingButton = styled(BaseButton)`
  background-color: #be8315;
`;

const UnattendButton = styled(BaseButton)`
  background-color: #474747;
`;
