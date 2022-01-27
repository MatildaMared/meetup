import { render, screen } from "@testing-library/react";
import MyMeetups from "./MyMeetups";
import { meetups } from "./../../dummyData/meetups";
import { singleUser } from "./../../dummyData/users";
import { getUserFromLocalStorage } from "../../services/localStorageService";

// Set up mock for localStorageService
jest.mock("../../services/localStorageService", () => {
  return {
    getUserFromLocalStorage: jest.fn(),
  };
});

// Set up mock for useNavigate from react-router-dom
const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
}));

// Actual tests
describe("MyMeetups component", () => {
  it("renders without crashing", () => {
    render(<MyMeetups meetups={meetups} />);
  });

  it("displays a title", () => {
    render(<MyMeetups meetups={meetups} />);

    expect(screen.getByText(/Meetups I'm hosting/i)).toBeInTheDocument();
  });

  it("displays no meetups if user is not logged in", () => {
    render(<MyMeetups meetups={meetups} />);

    expect(
      screen.getByText(
        /You need to be logged in to see meetups that you are hosting/i
      )
    ).toBeInTheDocument();
  });

  it("displays meetups that the user is hosting if user is logged in", () => {
    // Mock return value for getUserFromLocalStorage function
    (getUserFromLocalStorage as jest.Mock).mockReturnValue(singleUser);
    render(<MyMeetups meetups={meetups} />);

    const filteredMeetups = meetups.filter(
      (meetup) => meetup.ownerId === singleUser.id
    );

    const renderedMeetups = screen.queryAllByRole("listitem");

    expect(renderedMeetups.length).toBe(filteredMeetups.length);
  });
});
