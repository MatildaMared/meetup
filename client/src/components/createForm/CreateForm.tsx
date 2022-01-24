import React from "react";
import styled from "styled-components";

function CreateForm() {
  return (
    <Form>
      <Heading>Create new meetup</Heading>
      <InputWrapper>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" required />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="category">Category</label>
        <select name="category" id="category" required>
          <option value="gaming">Gaming</option>
          <option value="programming">Programming</option>
        </select>
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description"></textarea>
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value="2022-01-01"
          min="2022-01-01"
          max="2022-12-31"
          required
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
          required
        ></input>
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="location">Location</label>
        <input type="text" id="location" required />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" id="imageUrl" required />
      </InputWrapper>
      <Button type="submit">Create Meetup</Button>
      <ErrorMessage />
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
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

export default CreateForm;
