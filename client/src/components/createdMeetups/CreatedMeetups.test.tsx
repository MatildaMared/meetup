import { render, screen } from "@testing-library/react";
import CreatedMeetups from "./CreatedMeetups";
import { meetups } from "./../../dummyData/meetups";
import { singleUser } from "./../../dummyData/users";
import { getUserFromLocalStorage } from "../../services/localStorageService";

// Set up mock for localStorageService
jest.mock("../../services/localStorageService", () => {
  return {
    getUserFromLocalStorage: jest.fn(),
    getTokenFromLocalStorage: jest.fn(),
  };
});

// Set up mock for useNavigate and useLocation from react-router-dom
const mockedNavigator = jest.fn();
const mockedLocation = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
  useLocation: () => mockedLocation,
}));

// Actual tests
describe("MyMeetups component", () => {
  it("renders without crashing", () => {
    render(<CreatedMeetups meetups={meetups} />);
  });

  it("displays a title", () => {
    render(<CreatedMeetups meetups={meetups} />);

    expect(screen.getByText(/Meetups I'm hosting/i)).toBeInTheDocument();
  });

  it("displays no meetups if user is not logged in", () => {
    render(<CreatedMeetups meetups={meetups} />);

    expect(
      screen.getByText(
        /You need to be logged in to see meetups that you are hosting/i
      )
    ).toBeInTheDocument();
  });

  it("displays meetups that the user is hosting if user is logged in", () => {
    // Mock return value for getUserFromLocalStorage function
    (getUserFromLocalStorage as jest.Mock).mockReturnValue(singleUser);
    render(<CreatedMeetups meetups={meetups} />);

    const filteredMeetups = meetups.filter(
      (meetup) => meetup.ownerId === singleUser.id
    );

    const renderedMeetups = screen.queryAllByRole("listitem");

    expect(renderedMeetups.length).toBe(filteredMeetups.length);
  });
});
