import { render, screen } from "@testing-library/react";
import EditButton from "./EditButton";
import { singleMeetup } from "../../dummyData/meetups";
import {
  getUserFromLocalStorage,
  getTokenFromLocalStorage,
} from "../../services/localStorageService";
import { deleteMeetup } from "../../services/meetupService";
import { singleUser } from "../../dummyData/users";
import userEvent from "@testing-library/user-event";
import { User } from "../../models/User";

// Dummy fetch responses
let successfulFetchResponse = {
  success: true,
  meetup: singleMeetup,
  user: singleUser,
};

// "../../services/meetupService"
jest.mock("../../services/meetupService", () => {
  return {
    deleteMeetup: jest.fn(),
  };
});

// Set up mock for useNavigate and useLocation from react-router-dom
const mockedNavigator = jest.fn();
const mockedLocation = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
  useLocation: () => mockedLocation,
}));

// Set up mock for localStorageService
jest.mock("../../services/localStorageService", () => {
  return {
    getUserFromLocalStorage: jest.fn() as jest.Mock,
    getTokenFromLocalStorage: jest.fn() as jest.Mock,
  };
});

// Skips the window confirm event when deleting a meetup
global.confirm = () => true;

// Actual tests
describe("EditButton component", () => {
  it("renders without crashing", () => {
    render(<EditButton meetup={singleMeetup} />);
  });

  it("displays no buttons if user is not logged in", () => {
    render(<EditButton meetup={singleMeetup} />);

    const buttons = screen.queryByRole("button");

    expect(buttons).not.toBeInTheDocument();
  });

  describe("If user is logged in", () => {
    beforeEach(() => {
      // Mock the getUserFromLocalStorage function
      (getUserFromLocalStorage as jest.Mock<User | null>).mockImplementation(
        () => singleUser
      );
    });

    it("displays an edit button", () => {
      render(<EditButton meetup={singleMeetup} />);

      const button = screen.queryByRole("button", { name: "Edit" });

      expect(button).toBeInTheDocument();
    });

    it("calls the useNavigate function with correct arguments if user clicks the edit button", () => {
      render(<EditButton meetup={singleMeetup} />);

      const button = screen.getByRole("button", { name: "Edit" });

      userEvent.click(button);

      expect(mockedNavigator).toHaveBeenCalledWith(
        `/meetups/${singleMeetup.id}/edit`
      );
    });

    it("displays a delete button", () => {
      render(<EditButton meetup={singleMeetup} />);

      const button = screen.queryByRole("button", { name: "Delete" });

      expect(button).toBeInTheDocument();
    });

    it("calls the deleteMeetup function when user clicks delete button", () => {
      (getTokenFromLocalStorage as jest.Mock<any>).mockImplementation(
        () => "token"
      );
      (deleteMeetup as jest.Mock<any>).mockImplementation(
        () => successfulFetchResponse
      );

      render(<EditButton meetup={singleMeetup} />);

      const deleteButton = screen.getByRole("button", { name: "Delete" });
      userEvent.click(deleteButton);

      expect(deleteMeetup).toHaveBeenCalledWith("token", singleMeetup.id);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
