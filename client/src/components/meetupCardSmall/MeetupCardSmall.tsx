import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Meetup } from "../../models/Meetup";
import { useNavigate } from "react-router-dom";
import { RiMapPin5Fill, RiTimeFill } from "react-icons/ri";
import { getUserFromLocalStorage } from "../../services/localStorageService";

function MeetupCardSmall(props: { meetup: Meetup }) {
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { meetup } = props;
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();
  const userId = user?.id;

  const redirectToMeetup = (id: string) => {
    navigate(`/meetups/${id}`);
  };

  useEffect(() => {
    if (meetup.ownerId === userId) {
      setIsOwner(true);
    }
  }, []);

  return (
    <MeetupCard key={meetup.id} onClick={() => redirectToMeetup(meetup.id)}>
      <MeetupAvatar src={meetup.imgUrl} alt={meetup.title} />
      <MeetupInfo>
        <h3>{meetup.title}</h3>
        {isOwner && <p>Is owner</p>}
        <p>
          <RiMapPin5Fill style={{ display: "inline" }} /> {meetup.location},
        </p>
        <p>
          <RiTimeFill style={{ display: "inline" }} />{" "}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
`;

const MeetupAvatar = styled.img`
  padding: 2rem;
`;

const MeetupInfo = styled.div`
  padding: 0 2rem 1rem 2rem;
`;

export default MeetupCardSmall;
