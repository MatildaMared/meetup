import React from "react";
import styled from "styled-components";
import { Meetup } from "../../models/Meetup";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin } from "react-feather";
import EditButton from "../editButton/EditButton";

function MeetupCardSmall(props: { meetup: Meetup }) {
  const { meetup } = props;
  const navigate = useNavigate();

  const redirectToMeetup = (e: any) => {
    e.stopPropagation();
    navigate(`/meetups/${meetup.id}`);
  };

  return (
    <MeetupCard key={meetup.id} onClick={redirectToMeetup}>
      <MeetupAvatar src={meetup.imgUrl} alt={meetup.title} />
      <MeetupInfo>
        <h3>{meetup.title}</h3>
        <EditButton meetup={meetup} />
        <p>
          <MapPin size={16} /> {meetup.location},
        </p>
        <p>
          <Clock size={16} />
          {new Date(meetup.date).toLocaleString([], {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        {/* {getUserId(meet.ownerId)}@{meet.location}{" "} */}
      </MeetupInfo>
    </MeetupCard>
  );
}

const MeetupCard = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 1rem; */
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
`;

const MeetupAvatar = styled.img`
  padding: 2rem;
`;

const MeetupInfo = styled.div`
  padding: 0 2rem 1rem 2rem;
`;

export default MeetupCardSmall;
