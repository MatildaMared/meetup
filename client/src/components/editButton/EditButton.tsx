import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
} from "../../services/localStorageService";
import { useNavigate, useLocation } from "react-router-dom";
import { Meetup } from "../../models/Meetup";
import { Edit, XSquare } from "react-feather";
import { deleteMeetup } from "../../services/meetupService";

function EditButton(props: { meetup: Meetup }) {
  const { ownerId, date, id } = props.meetup;
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUserFromLocalStorage();
  const token = getTokenFromLocalStorage();
  const userId = user?.id;

  function redirectToEditPage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
    navigate(`/meetups/${id}/edit`);
  }

  const onDeleteHandler = async (e: any) => {
    e.stopPropagation();
    if (
      window.confirm(
        "Are you sure you want to delete this meetup? You cannot undo this decision later."
      )
    ) {
      const response = await deleteMeetup(token as string, id);
      if (response.success) {
        if (location.pathname === "/") {
          window.location.reload();
        } else {
          navigate("/");
        }
      }
    }
  };

  useEffect(() => {
    // if current user is the owner of the meetup
    if (ownerId === userId) {
      setIsOwner(true);
      // and if meetup has not already happened
      if (new Date(date) > new Date()) {
        // set canEdit to true
        setCanEdit(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isOwner) {
    return (
      <Wrapper>
        {canEdit && (
          <Button onClick={redirectToEditPage}>
            <Edit size={16} />
            <span>Edit</span>
          </Button>
        )}
        <DeleteButton onClick={onDeleteHandler}>
          <XSquare size={16} />
          <span>Delete</span>
        </DeleteButton>
      </Wrapper>
    );
  } else {
    return null;
  }
}

const Wrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
`;

const Button = styled.button`
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

const DeleteButton = styled(Button)`
  margin-left: 0.5rem;
  background-color: #b45053;

  &:hover {
    background-color: #b43026;
  }
`;

export default EditButton;
