import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Meetup } from "../../models/Meetup";
import { useNavigate } from "react-router-dom";
import { RiMapPin5Fill, RiTimeFill } from "react-icons/ri";
import { getUserFromLocalStorage } from "../../services/localStorageService";
import { Edit } from "react-feather";

function MeetupCardSmall(props: { meetup: Meetup }) {
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const { meetup } = props;
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();
  const userId = user?.id;

  const redirectToMeetup = (e: any) => {
    e.stopPropagation();
    navigate(`/meetups/${meetup.id}`);
  };

  const redirectToEditPage = (e: any) => {
    e.stopPropagation();
    navigate(`/meetups/${meetup.id}/edit`);
  };

  useEffect(() => {
    // if current user is the owner of the meetup
    if (meetup.ownerId === userId) {
      // and if meetup has not already happened
      if (new Date(meetup.date) > new Date()) {
        // set canEdit to true
        setCanEdit(true);
      }
    }
  }, []);

  return (
    <MeetupCard key={meetup.id} onClick={redirectToMeetup}>
      <MeetupAvatar src={meetup.imgUrl} alt={meetup.title} />
      <MeetupInfo>
        <h3>{meetup.title}</h3>
        {canEdit && (
          <EditButton onClick={redirectToEditPage}>
            <Edit size={16} />
            <span>Edit</span>
          </EditButton>
        )}
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
  position: relative;
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

const EditButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  background-color: #474747;
  color: #eee;
  padding: 4px 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
  border: none;
  cursor: pointer;

  & span {
    margin-left: 0.5rem;
  }

  &:hover {
    background-color: #7e7e7e;
  }
`;

export default MeetupCardSmall;
