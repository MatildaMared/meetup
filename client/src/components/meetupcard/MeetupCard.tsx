import { Meetup } from "../../models/Meetup";
import { User } from "../../models/User";
import styled from "styled-components";
import OwnerButtons from "../ownerButtons/OwnerButtons";
import AttendButton from "../attendMeetup/AttendButton";
import MeetupInfo from "../meetupInfo/MeetupInfo";

interface MeetupProps {
  meetup: Meetup;
  user: User;
  attending: boolean;
  setAttending: Function;
  isLoggedIn: boolean;
  setSingleMeetup: Function;
}

const MeetupCard: React.FC<MeetupProps> = ({
  meetup,
  user,
  attending,
  setAttending,
  isLoggedIn,
  setSingleMeetup,
}): JSX.Element => {
  return (
    <>
      {meetup && (
        <StyledCard>
          <OwnerButtons meetup={meetup} />
          {isLoggedIn && (
            <AttendButton
              attending={attending}
              setAttending={setAttending}
              setMeetup={setSingleMeetup}
            />
          )}
          <MeetupInfo meetup={meetup} user={user} />
        </StyledCard>
      )}
    </>
  );
};

export default MeetupCard;

const StyledCard = styled.div`
  position: relative;
  display: flex;
  max-width: 60vw;
  padding: 3rem;
  margin: 10px auto;
  flex-direction: column;
  background-color: lightgrey;
  border-radius: 5px;

  h3 {
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  small {
    color: darkgrey;
  }

  h4 {
    margin-top: 1.6rem;
  }

  @media (max-width: 640px) {
    max-width: 400px;
  }
`;
