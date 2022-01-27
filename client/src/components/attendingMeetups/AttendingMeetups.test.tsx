import { render, screen } from "@testing-library/react";
import AttendingMeetups from "./AttendingMeetups";
import { meetups } from "./../../dummyData/meetups";
import { getUserFromLocalStorage } from "../../services/localStorageService";
import { singleUser } from "./../../dummyData/users";

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
describe("AttendingMeetups component", () => {
  it("renders without crashing", () => {
    render(<AttendingMeetups meetups={meetups} />);
  });

  it("displays a title", () => {
    render(<AttendingMeetups meetups={meetups} />);

    expect(screen.getByText(/Meetups I'm attending/i)).toBeInTheDocument();
  });

  it("displays no meetups if user is not logged in", () => {
    render(<AttendingMeetups meetups={meetups} />);

    expect(
      screen.getByText(
        /You need to be logged in to see meetups that you are attending/i
      )
    ).toBeInTheDocument();
  });

  it("displays meetups that the user is attending if user is logged in", () => {
    // Mock return value for getUserFromLocalStorage function
    (getUserFromLocalStorage as jest.Mock).mockReturnValue(singleUser);
    render(<AttendingMeetups meetups={meetups} />);

    const filteredMeetups = meetups.filter((meetup) =>
      meetup.attendees.some((attendee) => attendee.id === singleUser.id)
    );

    const renderedMeetups = screen.queryAllByRole("listitem");

    expect(renderedMeetups.length).toBe(filteredMeetups.length);
  });
});
