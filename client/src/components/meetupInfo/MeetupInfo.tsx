import { Meetup } from "../../models/Meetup";
import { User } from "../../models/User";
import styled from "styled-components";
import { Clock, MapPin, Users, Hash } from "react-feather";

interface Props {
  meetup: Meetup;
  user: User;
}

function MeetupInfo(props: Props) {
  const meetup = props.meetup;
  const user = props.user;

  return (
    <div>
      <Info>
        <h3>{meetup.title}</h3>

        <StyledMeetupInfo>
          <MapPin size={16} strokeWidth={2} />
          {meetup.location}
        </StyledMeetupInfo>

        <StyledMeetupInfo>
          <Clock size={16} strokeWidth={2} />
          {new Date(meetup.date).toLocaleString([], {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </StyledMeetupInfo>
        <StyledMeetupInfo>
          <Hash size={12} strokeWidth={2} />
          <small style={{ color: "black" }}>{meetup.category}</small>
        </StyledMeetupInfo>

        <small>created by {user ? user.firstName : "unknown"}</small>

        <h4>Event Info</h4>
        <p>{meetup.description}</p>
      </Info>
    </div>
  );
}

export default MeetupInfo;

const Info = styled.div`
  width: 100%;
  padding: 1rem 1rem 5rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
`;

const StyledMeetupInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  margin-bottom: 0.5rem;

  & svg {
    margin-right: 0.5rem;
    color: #5b5b5b;
  }
`;
