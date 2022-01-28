import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getSingleMeetup } from "../../services/meetupService";
import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
} from "../../services/localStorageService";
import Header from "./../../components/header/Header";

async function updateMeetup(newMeetup: object, id: string, token: string) {
  const response = await fetch(`/api/meetups/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    },
    body: JSON.stringify(newMeetup),
  });
  return response.json();
}

function EditPage() {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("gaming");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("2022-01-01");
  const [time, setTime] = useState<string>("19:00");
  const [location, setLocation] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("https://");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [meetupId, setMeetupId] = useState<string>("");
  const navigate = useNavigate();

  const { meetupid } = useParams();
  const user = getUserFromLocalStorage();
  const token = getTokenFromLocalStorage();
  const userId = user?.id;

  const getMeetup = async () => {
    const response = await getSingleMeetup(meetupid as string);
    if (response.success) {
      // redirect to homepage if userId is not the same as the meetup owner id or token does not exist
      if (response.meetup.ownerId !== userId || !token) {
        navigate("/");
      } else {
        setTitle(response.meetup.title);
        setCategory(response.meetup.category);
        setDescription(response.meetup.description);
        setDate(response.meetup.date.split("T")[0]);
        setTime(response.meetup.date.split("T")[1].slice(0, 5));
        setLocation(response.meetup.location);
        setImageUrl(response.meetup.imgUrl);
        setMeetupId(response.meetup.id);
      }
    }
  };

  function displayErrorMessage(message: string) {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !title ||
      !category ||
      !description ||
      !date ||
      !time ||
      !location ||
      !imageUrl
    ) {
      displayErrorMessage("Please fill in all fields");
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

    const data = await updateMeetup(meetupObj, meetupId, token as string);
    if (data.success) {
      navigate("/meetups/" + meetupId);
    } else {
      displayErrorMessage(data.error);
    }
  };

  useEffect(() => {
    getMeetup();
  }, []);

  return (
    <>
      <Header />
      <Wrapper>
        <Form onSubmit={onSubmitHandler}>
          <Heading>Edit Meetup</Heading>
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
          <Button type="submit">Edit Meetup</Button>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </Form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main`
  padding-top: 100px;
  padding-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 2rem auto;
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

export default EditPage;
