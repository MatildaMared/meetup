import { render, screen, waitFor } from "@testing-library/react";
import MeetupPage from "./MeetupPage";
import userEvent from "@testing-library/user-event";

import { getTokenFromLocalStorage } from "../../services/localStorageService";

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

  it("check that the MeetupCard is renderd in the MeetupPate", () => {
    const { getByText } = render(<MeetupPage />);
    expect(getByText(/Event Info/i)).toBeInTheDocument();
  });

  it("checks that the Comment-component is renderd in the MeetupPage", () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );
    const { getByText } = render(<MeetupPage />);
    expect(getByText(/comments/i)).toBeInTheDocument();
  });
});
