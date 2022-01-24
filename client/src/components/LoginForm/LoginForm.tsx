import React, { useState, useRef } from "react";
import styled from "styled-components";
import { login } from "../../services/authService";

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const buttonElement = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function displayErrorMessage(message: string) {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    console.log(username, password);

    if (!username || !password) {
      displayErrorMessage("Please enter username and password");
    }

    const data = await login(username, password);
    console.log(data);

    if (data.error) {
      displayErrorMessage(data.error);
    }

    resetInputFields();
  }

  function resetInputFields(): void {
    setUsername("");
    setPassword("");
    if (usernameInput.current) {
      usernameInput.current.blur();
    }
    if (passwordInput.current) {
      passwordInput.current.blur();
    }
    if (buttonElement.current) {
      buttonElement.current.blur();
    }
  }

  return (
    <Form onSubmit={onSubmitHandler}>
      <Heading>Login</Heading>
      <InputWrapper>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          ref={usernameInput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          ref={passwordInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputWrapper>
      <Button type="submit" value="Login" ref={buttonElement} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
  margin-bottom: 0;
`;

export default LoginForm;
