import { useState } from "react";
import { createComment } from "../../services/meetupService";
import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
} from "../../services/localStorageService";
import { UserComment } from "../../models/UserComment";
import { Meetup } from "../../models/Meetup";
import styled from "styled-components";
import DeleteCommentButton from "../deleteCommentButton/DeleteCommentButton";

interface MeetupProps {
  meetup: Meetup;
  setMeetup: Function;
}

const Comment: React.FC<MeetupProps> = ({ meetup, setMeetup }): JSX.Element => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const userComments = meetup?.comments as UserComment[];
  const token = getTokenFromLocalStorage();
  const user = getUserFromLocalStorage();

  function displayErrorMessage(message: string) {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newComment: string = e.target.firstChild.nextSibling.value;

    if (!token) {
      displayErrorMessage("You must be logged in to write a comment");
      return;
    } else if (!newComment) {
      displayErrorMessage("Please write a comment before submiting");
    } else {
      const fetchResponse = await createComment(meetup.id, token, newComment);
      setMeetup(fetchResponse.meetup);
      setInputValue("");
      return fetchResponse;
    }
  };

  return (
    <>
      {token ? (
        <StyledDiv>
          <StyledForm onSubmit={(e) => handleSubmit(e)}>
            <h3>Comment</h3>
            <textarea
              placeholder="Enter your comment here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            ></textarea>
            <button type="submit">Submit</button>
          </StyledForm>
          <p>{errorMessage}</p>
        </StyledDiv>
      ) : null}

      <StyledDiv>
        <h3>Comments</h3>
        {userComments?.length === 0 && (
          <p>There are not comments yet, be the first to comment!</p>
        )}
        {userComments?.length > 0 &&
          userComments.map((comment) => (
            <CommentCard key={comment.id} data-id={comment.id}>
              <CommentAndBy>
                <p>{comment.comment}</p>
                <small>by {comment.name}</small>
              </CommentAndBy>
              {(comment.userId === user?.id || meetup.ownerId === user?.id) && (
                <DeleteCommentButton
                  meetup={meetup as Meetup}
                  setMeetup={setMeetup}
                />
              )}
            </CommentCard>
          ))}
      </StyledDiv>
    </>
  );
};

export default Comment;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60vw;
  padding: 2rem;
  border: 2px solid lightgrey;
  border-radius: 1rem;
  margin: 0 auto 1rem;
  color: #000;

  @media (max-width: 940px) {
    max-width: 90%;
  }
`;

const StyledForm = styled.form`
  position: relative;

  textarea {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ddd;
    outline: none;
    font: inherit;
    resize: none;
    margin: 5px 0;

    &:focus {
      outline: 2px dotted #5b5b5b;
      outline-offset: 4px;
    }
  }

  button {
    display: block;
    background-color: #474747;
    color: #eee;
    padding: 4px 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.3s;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);

    &:hover {
      background-color: #7e7e7e;
    }
  }
`;

const CommentAndBy = styled.div`
  min-width: 300px;
`;

const CommentCard = styled.article`
  border: 1px solid #ddd;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  align-items: center;

  @media (max-width: 560px) {
    flex-direction: column;
  }
`;
