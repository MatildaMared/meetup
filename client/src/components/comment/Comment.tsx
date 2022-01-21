import styled from "styled-components";

function Form() {
  return (
    <StyledDiv>
      <StyledForm>
        <h3>Comment</h3>
        <input type="text" />
        <button>Submit</button>
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
    padding: 2rem;
    margin-bottom: 0.4rem;
  }

  button {
    padding: 0.4rem 0.9rem;
    display: block;
    position: absolute;
    left: 11.4rem;
    background-color: transparent;
    border: 2px solid lightblue;
    border-radius: 4px;
    /* text-transform: uppercase; */
    color: lightblue;
  }
`;
