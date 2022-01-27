import React from 'react';
import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
} from "../../services/localStorageService";
import styled from "styled-components";

interface Props {
  attending: boolean;
  setAttending: Function;
  setMeetup: Function;
}

function DeleteCommentButton() {

  async function deleteHandler (e: any) {

  }

  return <DeleteButton onClick={(e) => deleteHandler(e)}>
    Delete Comment
  </DeleteButton>;
}

const DeleteButton = styled.button `
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  z-index: 5;
  background-color: #474747;
  color: #eee;
  padding: 4px 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #7e7e7e;
  }

  &:active {
    transform: scale(0.98);
  }
`

export default DeleteCommentButton;
