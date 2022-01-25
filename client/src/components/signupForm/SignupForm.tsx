import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signup } from "../../services/authService";
import {
  saveUserInLocalStorage,
  saveTokenInLocalStorage,
} from "../../services/localStorageService";

function SignupForm() {
  const [successfulSignup, setSuccessfulSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const firstNameInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const passwordConfirmInput = useRef<HTMLInputElement>(null);
  const buttonElement = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const navigate = useNavigate();

  function displayErrorMessage(message: string) {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    const passwordsMatch = comparePasswords(password, passwordConfirm);

    if (!passwordsMatch) {
      displayErrorMessage("Passwords do not match");
      return;
    }

    if (!username || !password || !firstName || !passwordConfirm) {
      displayErrorMessage("Please fill in all fields");
      return;
    }

    const data = await signup(firstName, username, password);
    resetInputFields();

    if (data.error) {
      displayErrorMessage(data.error);
    } else if (data.success) {
      saveTokenInLocalStorage(data.token);
      saveUserInLocalStorage(data.user);
      setSuccessfulSignup(true);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }

  function resetInputFields(): void {
    setFirstName("");
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
    if (usernameInput.current) {
      usernameInput.current.blur();
    }
    if (firstNameInput.current) {
      firstNameInput.current.blur();
    }
    if (passwordInput.current) {
      passwordInput.current.blur();
    }
    if (passwordConfirmInput.current) {
      passwordConfirmInput.current.blur();
    }
    if (buttonElement.current) {
      buttonElement.current.blur();
    }
  }

  function comparePasswords(
    password: string,
    passwordConfirm: string
  ): boolean {
    return password === passwordConfirm;
  }

  if (successfulSignup) {
    return (
      <SuccessMessage>
        Signed up successfully! Redirecting to homepage in 5 seconds..
      </SuccessMessage>
    );
  } else {
    return (
      <Form onSubmit={onSubmitHandler}>
        <Heading>Sign up</Heading>
        <InputWrapper>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            ref={firstNameInput}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </InputWrapper>
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
        <InputWrapper>
          <label htmlFor="passwordConfirm">Confirm password</label>
          <input
            type="password"
            id="passwordConfirm"
            ref={passwordConfirmInput}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </InputWrapper>
        <Button type="submit" value="Sign up" ref={buttonElement} />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    );
  }
}

const SuccessMessage = styled.p`
  font-size: 1.5rem;
  text-align: center;
  padding-bottom: 100px;
`;

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

export default SignupForm;
