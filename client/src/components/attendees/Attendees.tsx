import React from "react";
import { Meetup } from "../../models/Meetup";
import styled from "styled-components";
interface Props {
  meetup: Meetup;
}

const Attendees: React.FC<Props> = ({ meetup }): JSX.Element => {
  return (
    <>
      {meetup && (
        <StyledAttend>
          <h2>Attendees</h2>
          <StyledList>
            {meetup.attendees.map((attend) => (
              <li key={attend.id}>{attend.name}</li>
            ))}
          </StyledList>
        </StyledAttend>
      )}
    </>
  );
};

export default Attendees;

const StyledAttend = styled.div`
  width: 70%;
  background-color: #ddd;
  text-align: center;
  margin: 20px auto;
  padding: 2rem;

  h2 {
    margin-bottom: 0.8rem;
  }
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 50%;
  margin: 0 auto;

  li {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    font-size: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    background-color: #474747;
    color: #eee;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 7px rgba(0, 0, 0, 0.5);
      /* transform: scale(1.01); */
    }
  }
`;
