import { render, screen, waitFor } from "@testing-library/react";
import MeetupPage from "./MeetupPage";
import userEvent from "@testing-library/user-event";

import { getTokenFromLocalStorage } from "../../services/localStorageService";

// Dummy fetch response
let successfulFetchResponse = {
  success: true,
  meetup: {
    id: 1,
    title: "Test",
    category: "gaming",
    description: "Test",
    date: "2022-01-01T19:00",
    location: "Test",
    imgUrl: "https://",
    attendees: [],
    comments: [],
    ownerId: 1,
  },
  user: {
    id: 1,
    username: "username",
    firstName: "First Name",
  },
};

let unsuccessfulFetchResponse = {
  success: false,
  error: "Error message",
};

// Set up mock for loaclStorageService
jest.mock("../../services/localStorageService", () => {
  return {
    saveUserInLocalStorage: jest.fn(),
    saveTokenInLocalStorage: jest.fn(),
    getTokenFromLocalStorage: jest.fn(),
    getUserFromLocalStorage: jest.fn(),
  };
});

describe("Testing for the MeetupPage", () => {
  it("render the MeetupPage component without crashing", () => {
    render(<MeetupPage />);
  });

  it("shows a attend-button on the page if logged in", () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );
    render(<MeetupPage />);
    const button = screen.getByText(/Attend Meetup/i);
    expect(button).toBeInTheDocument();
  });

  it("shows a leave-button on the page if logged in", () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );
    render(<MeetupPage />);
    const button = screen.getByText(/Attend Meetup/i);
    userEvent.click(button);
    expect(button).toHaveTextContent(/Unattend Meetup/i);
  });

  // it("check that the MeetupCard is renderd in the MeetupPate", () => {
  //   const { getByText } = render(<MeetupPage />);
  //   expect(getByText(/Event Info/i)).toBeInTheDocument();
  // });

  it("checks that the Comment-component is renderd in the MeetupPage", () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );
    const { getByText } = render(<MeetupPage />);
    expect(getByText(/submit/i)).toBeInTheDocument();
  });
});
