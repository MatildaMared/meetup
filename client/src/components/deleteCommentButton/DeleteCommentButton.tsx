import React from "react";
import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
} from "../../services/localStorageService";
import { deleteComment } from "../../services/meetupService";
import { Meetup } from "../../models/Meetup";
import styled from "styled-components";

interface MeetupProps {
  meetup: Meetup;
  setMeetup: Function;
}

const DeleteCommentButton: React.FC<MeetupProps> = ({
  meetup,
  setMeetup,
}): JSX.Element => {
  const token = getTokenFromLocalStorage();

  async function deleteHandler(e: any) {
    if (token) {
      let commentId = e.target.parentElement.getAttribute("data-id");
      const fetchResponse = await deleteComment(meetup?.id, token, commentId);
      setMeetup(fetchResponse.meetup);
    }
  }

  return <DeleteButton onClick={(e) => deleteHandler(e)}>Delete</DeleteButton>;
};

const DeleteButton = styled.button`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  z-index: 5;
  background-color: #474747;
  color: #eee;
  padding: 4px 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  height: fit-content;

  &:hover {
    background-color: #7e7e7e;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default DeleteCommentButton;
