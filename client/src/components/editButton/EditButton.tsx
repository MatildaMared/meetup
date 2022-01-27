import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUserFromLocalStorage } from "../../services/localStorageService";
import { useNavigate } from "react-router-dom";
import { Meetup } from "../../models/Meetup";
import { Edit } from "react-feather";

function EditButton(props: { meetup: Meetup }) {
  const { ownerId, date, id } = props.meetup;
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();
  const userId = user?.id;

  const redirectToEditPage = (e: any) => {
    e.stopPropagation();
    navigate(`/meetups/${id}/edit`);
  };

  useEffect(() => {
    // if current user is the owner of the meetup
    if (ownerId === userId) {
      // and if meetup has not already happened
      if (new Date(date) > new Date()) {
        // set canEdit to true
        setCanEdit(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (canEdit) {
    return (
      <Button onClick={redirectToEditPage}>
        <Edit size={16} />
        <span>Edit</span>
      </Button>
    );
  } else {
    return null;
  }
}

const Button = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
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

export default EditButton;
