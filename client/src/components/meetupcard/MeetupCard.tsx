import { Meetup } from "../../models/Meetup";
import { User } from "../../models/User";
import styled from "styled-components";
import OwnerButtons from "../ownerButtons/OwnerButtons";
import AttendButton from "../attendMeetup/AttendButton";
import MeetupInfo from "../meetupInfo/MeetupInfo";
import Attendees from "../../components/attendees/Attendees";

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
          <Image src={meetup.imgUrl} alt="" />
          {isLoggedIn && (
            <AttendButton
              attending={attending}
              setAttending={setAttending}
              setMeetup={setSingleMeetup}
            />
          )}
          <MeetupInfo meetup={meetup} user={user} />
          <Attendees meetup={meetup as Meetup} />
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
  margin: 1.5rem auto;
  flex-direction: column;
  background-color: lightgrey;
  border-radius: 1rem;

  h3 {
    text-transform: uppercase;
    margin-bottom: 5px;
    font-size: 1.6rem;
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

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
`;
