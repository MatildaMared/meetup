import React from "react";
import styled from "styled-components";
import { Meetup } from "../../models/Meetup";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, Users } from "react-feather";
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
      <DescriptionSlice>
        {meetup.description.length > 110
          ? meetup.description.slice(0, 110) + "..."
          : meetup.description}
      </DescriptionSlice>
      <Divider />
      <EditButton meetup={meetup} />
      <MeetupInfo>
        <MapPin size={16} strokeWidth={2} />
        <p>{meetup.location}</p>
      </MeetupInfo>
      <MeetupInfo>
        <Clock size={16} strokeWidth={2} />
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
      <MeetupInfo>
        <Users size={16} strokeWidth={2} />
        <p>
          {meetup.attendees.length}{" "}
          {meetup.attendees.length === 1
            ? " person attending"
            : " people attending"}
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
  transition: all 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: rgba(0, 0, 0, 0.07);
  margin: 0 auto;
  margin-bottom: 1rem;
`;

const DescriptionSlice = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1rem;
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
    color: #5b5b5b;
  }
`;

export default MeetupCardSmall;
