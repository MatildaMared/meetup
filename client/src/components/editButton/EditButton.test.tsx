import { render, screen } from "@testing-library/react";
import EditButton from "./EditButton";
import { singleMeetup } from "../../dummyData/meetups";
import { getUserFromLocalStorage } from "../../services/localStorageService";

// Set up mock for useNavigate from react-router-dom
const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
}));

// Set up mock for localStorageService
jest.mock("../../services/localStorageService", () => {
  return {
    getUserFromLocalStorage: jest.fn() as jest.Mock,
  };
});

describe("EditButton component", () => {
  it("renders without crashing", () => {
    render(<EditButton meetup={singleMeetup} />);
  });

  it("displays no button if user is not logged in", () => {
    render(<EditButton meetup={singleMeetup} />);

    const button = screen.queryByRole("button");

    expect(button).not.toBeInTheDocument();
  });

  it("displays a button if user is logged in", () => {
    const user = {
      id: "1",
      firstName: "Test",
      username: "username",
    };

    (getUserFromLocalStorage as jest.Mock<object>).mockImplementation(
      () => user
    );

    render(<EditButton meetup={singleMeetup} />);

    const button = screen.queryByRole("button");

    expect(button).toBeInTheDocument();
  });
});
