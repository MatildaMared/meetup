import React, { useState } from "react";
import styled from "styled-components";
import { getTokenFromLocalStorage } from "../../services/localStorageService";
import { createMeetup } from "../../services/meetupService";
import { useNavigate } from "react-router-dom";

function CreateForm() {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("gaming");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("2022-01-01");
  const [time, setTime] = useState<string>("19:00");
  const [location, setLocation] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("https://");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  function displayErrorMessage(message: string) {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const token = getTokenFromLocalStorage();

    if (!token) {
      displayErrorMessage("You must be logged in to create a meetup");
      return;
    }

    const meetupObj = {
      title,
      category,
      description,
      date: `${date}T${time}`,
      location,
      imgUrl: imageUrl,
    };

    if (!title || !category || !description || !date || !time || !location) {
      displayErrorMessage("Please fill in all fields");
    }

    const meetupData = await createMeetup(meetupObj, token);

    if (meetupData.success === true) {
      setSuccess(true);
      setTimeout(() => {
        // Fixa redirect till event-sidan
        navigate(`/meetups/${meetupData.meetup.id}`);
      }, 5000);
    } else {
      displayErrorMessage(meetupData.error);
    }
  }

  if (success) {
    return (
      <SuccessMessage>
        Meetup created successfully! Redirecting to meetup page in 5 seconds.
      </SuccessMessage>
    );
  } else {
    return (
      <Form onSubmit={onSubmitHandler}>
        <Heading>Create new meetup</Heading>
        <InputWrapper>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="gaming">Gaming</option>
            <option value="programming">Programming</option>
          </select>
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min="2022-01-01"
            max="2022-12-31"
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            min="00:00"
            max="23:59"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          ></input>
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </InputWrapper>
        <Button type="submit">Create Meetup</Button>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </Form>
    );
  }
}

const Form = styled.form`
  width: 650px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 1rem;
  padding: 2rem;

  @media (max-width: 700px) {
    width: 500px;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
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
  width: 100%;

  & label {
    display: block;
    margin-bottom: 0.5rem;
  }

  & input,
  & textarea {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ddd;
    outline: none;
    font: inherit;
    resize: none;

    &:focus {
      outline: 2px dotted #5b5b5b;
      outline-offset: 4px;
    }
  }
`;

const Button = styled.button`
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

const SuccessMessage = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 auto;
  text-align: center;
  padding-top: 100px;
  padding-bottom: 100px;
`;

export default CreateForm;
