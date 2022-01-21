import React from "react";
import styled from "styled-components";

function LoginForm() {
  return (
    <Form>
      <Heading>Login</Heading>
      <InputWrapper>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </InputWrapper>
      <Button type="submit" value="Login" />
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 1rem;
  padding: 2rem;
`;

const Heading = styled.h1`
  width: fit-content;
  margin: 0 auto;
  background-color: white;
  margin-top: -3.5rem;
  padding: 0 0.5rem;
`;

const InputWrapper = styled.div`
  margin-bottom: 1rem;

  & label {
    display: block;
    margin-bottom: 0.5rem;
  }

  & input {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ddd;
    outline: none;
    font: inherit;

    &:focus {
      outline: 2px dotted #5b5b5b;
      outline-offset: 4px;
    }
  }
`;

const Button = styled.input`
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  outline: none;
  transition: all 0.3s;

  &:hover {
    background-color: #a7a7a7;
  }

  &:focus {
    outline: 2px dotted #5b5b5b;
    outline-offset: 4px;
  }
`;

export default LoginForm;
