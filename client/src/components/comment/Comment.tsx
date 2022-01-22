import { useState } from "react";
import styled from "styled-components";

function Form() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setInputValue("");
  };

  return (
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
    </StyledDiv>
  );
}

export default Form;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  margin: 0 auto;
  padding: 3rem 5rem;
  border: 2px solid darkgray;
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
