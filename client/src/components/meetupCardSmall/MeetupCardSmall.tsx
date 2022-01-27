import React from "react";
import styled from "styled-components";
import { Meetup } from "../../models/Meetup";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin } from "react-feather";
import EditButton from "../editButton/EditButton";

interface Props {
  meetup: Meetup;
}

function MeetupCardSmall(props: Props) {
  const { meetup } = props;
  const navigate = useNavigate();

  const redirectToMeetup = (e: any) => {
    e.stopPropagation();
    navigate(`/meetups/${meetup.id}`);
  };

  return (
    <MeetupCard key={meetup.id} onClick={redirectToMeetup}>
      <ImgWrapper>
        <MeetupImg src={meetup.imgUrl} alt={meetup.title} />
      </ImgWrapper>
      <Heading>{meetup.title}</Heading>
      <EditButton meetup={meetup} />
      <MeetupInfo>
        <MapPin size={16} />
        <p>{meetup.location}</p>
      </MeetupInfo>
      <MeetupInfo>
        <Clock size={16} />
        <p>
          {new Date(meetup.date).toLocaleString([], {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </MeetupInfo>
    </MeetupCard>
  );
}

const MeetupCard = styled.li`
  list-style-type: none;
  position: relative;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  color: #202020;
`;

const ImgWrapper = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
`;

const Heading = styled.h3`
  margin: 1rem 0 0.5rem 0;
  font-size: 1.8rem;
`;

const MeetupImg = styled.img`
  width: 100%;
  height: auto;
`;

const MeetupInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  margin-bottom: 0.5rem;

  & svg {
    margin-right: 0.5rem;
  }
`;

export default MeetupCardSmall;
