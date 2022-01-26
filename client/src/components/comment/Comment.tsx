import { useEffect, useState } from "react";
import { createComment } from "../../services/meetupService";
import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
} from "../../services/localStorageService";
import { UserComment } from "../../models/UserComment";
import { Meetup } from "../../models/Meetup";
import { User } from "../../models/User";
import styled from "styled-components";

interface MeetupProps {
  meetup: Meetup;
  user: User;
}

const Comment: React.FC<MeetupProps> = ({ meetup, user }): JSX.Element => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userComments, setUserComments] = useState<[] | [UserComment]>([]);
  const currentUser = getUserFromLocalStorage();

  useEffect( () => {
    fetchComments();
  }, [])

  async function fetchComments () {
    console.log(meetup?.comments);
    
    setUserComments(meetup?.comments as []);
  }

  function displayErrorMessage(message: string) {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = getTokenFromLocalStorage();
    const newComment: string = e.target.firstChild.nextSibling.value;

    if (!token) {
      displayErrorMessage("You must be logged in to write a comment");
      return;
    } else if (!newComment) {
      displayErrorMessage("Please write a comment before submiting");
    } else {
      const fetchResponse = await createComment(meetup.id, token, newComment);
      setUserComments(fetchResponse.meetup.comments);
      setInputValue("");
      return fetchResponse;
    }
  };

  return (
    <>
      <StyledDiv>
        <StyledForm onSubmit={(e) => handleSubmit(e)}>
          <h3>Comment</h3>
          <input
            type="text"
            placeholder="Enter your comment here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Submit</button>
        </StyledForm>
        <p>{errorMessage}</p>
      </StyledDiv>
      <StyledDiv>
        <h3>Comments</h3>
        {userComments.length === 0 && (
          <p>There are not comments yet, be the first to comment!</p>
        )}
        {userComments.length > 0 &&
          userComments.map((comment) => (
            <CommentCard key={comment.id}>
              <p>{comment.comment}</p>
              <p> by {}</p>
              <p></p>
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
  width: 90vw;
  margin: 0 auto;
  padding: 3rem 5rem;
  border: 2px solid lightgrey;
`;

const StyledForm = styled.form`
  position: relative;

  h3 {
    color: lightblue;
  }

  input {
    padding: 1rem 2rem 3rem 2rem;
    margin-bottom: 0.4rem;
    font-family: sans-serif;

    &:focus {
      outline: none;
    }
  }

  button {
    padding: 0.4rem 0.9rem;
    display: block;
    position: absolute;
    left: 11.4rem;
    background-color: transparent;
    border: 2px solid lightblue;
    border-radius: 4px;
    color: lightblue;
  }
`;

const CommentCard = styled.article`
  border: 1px solid black;
  padding: 1rem 2rem;
`;
