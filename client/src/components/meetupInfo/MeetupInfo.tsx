import { Meetup } from "../../models/Meetup";
import { User } from "../../models/User";
import styled from "styled-components";

interface Props {
  meetup: Meetup;
  user: User;
}

function MeetupInfo(props: Props) {
  const meetup = props.meetup;
  const user = props.user;

  return (
    <div>
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
    </div>
  );
}

export default MeetupInfo;

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
