import { Meetup } from "../../models/Meetup";
import { User } from "../../models/User";
import styled from "styled-components";
import EditButton from "../editButton/EditButton";
import AttendButton from "../attendMeetup/AttendButton";

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
    <div>
      {meetup && (
        <StyledCard>
          <EditButton meetup={meetup} />
          {isLoggedIn && (
            <AttendButton
              attending={attending}
              setAttending={setAttending}
              setMeetup={setSingleMeetup}
            />
          )}
          <Image src={meetup.imgUrl} alt="" />
          <Info>
            <h3>{meetup.title}</h3>
            <p>
              {meetup.location} <br />
              {new Date(meetup.date).toLocaleString([], {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              <br />
              <small>created by {user ? user.firstName : "unknown"}</small>
            </p>
            <h4>Event Info</h4>
            <p>{meetup.description}</p>
          </Info>
        </StyledCard>
      )}
    </div>
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

const Image = styled.img`
  max-width: 50vw;
  margin: 0 auto;

  @media (max-width: 640px) {
    max-width: 300px;
  }
`;

const Info = styled.div`
  max-width: 50vw;
  margin: 0 auto;
  padding: 1rem 1rem 5rem;
  background-color: #ffffff;

  @media (max-width: 640px) {
    max-width: 300px;
  }
`;
