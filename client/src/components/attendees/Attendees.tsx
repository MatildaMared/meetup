import React from "react";
import { Meetup } from "../../models/Meetup";
import styled from "styled-components";
import { User } from "react-feather";

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
              <li key={attend.id}>
                <User size={16} strokeWidth={2} />

                {attend.name}
              </li>
            ))}
          </StyledList>
        </StyledAttend>
      )}
    </>
  );
};

export default Attendees;

const StyledAttend = styled.div`
  margin: 20px;
  padding: 1rem 0 0;

  h2 {
    margin-bottom: 0.8rem;
    font-size: 1.3rem;
  }
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;

  li {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    z-index: 5;
    width: fit-content;
    background-color: #474747;
    color: #eee;
    padding: 4px 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.3s;
    border: none;
    margin-right: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;

    & svg {
      margin-right: 0.3rem;
    }

    &:hover {
      box-shadow: 0 0 7px rgba(0, 0, 0, 0.5);
    }
  }
`;
