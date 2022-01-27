import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteCommentButton from "./DeleteCommentButton";
import { getTokenFromLocalStorage } from "../../services/localStorageService";
import { Meetup } from "../../models/Meetup";
import { singleMeetup } from "../../dummyData/meetups";

let meetupMock: Meetup;
let setMeetupMock: jest.Mock;

let successfulPostResponse = {
  success: true,
  meetup: singleMeetup,
};

jest.mock("../../services/localStorageService", () => {
  return {
    getTokenFromLocalStorage: jest.fn(),
    getUserFromLocalStorage: jest.fn(),
  };
});

beforeEach(() => {
  meetupMock;
  setMeetupMock = jest.fn();
});

describe("deleteCommentButton component", () => {
    it("renders without crashing", () => {
      render(<DeleteCommentButton meetup={meetupMock} setMeetup={setMeetupMock} />);
    });
  
    
  });

  //it("does not delete a comment when user is not owner of meetup or person who wrote the comment", () => {})
//it("deletes a comment when valid user clicks the delete button", () => {})