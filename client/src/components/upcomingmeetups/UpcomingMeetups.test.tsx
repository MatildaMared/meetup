import { render, screen } from "@testing-library/react";
import UpcomingMeetups from "./UpcomingMeetups";
import { meetups } from "./../../dummyData/meetups";

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
describe("UpcomingMeetups component", () => {
  it("renders without crashing", () => {
    render(<UpcomingMeetups meetups={meetups} />);
  });

  it("displays a title", () => {
    render(<UpcomingMeetups meetups={meetups} />);

    expect(screen.getByText(/Upcoming Meetups/i)).toBeInTheDocument();
  });

  it("displays only the meetups that has not happened yet", () => {
    render(<UpcomingMeetups meetups={meetups} />);

    const today = new Date();

    const filteredMeetups = [...meetups].filter(
      (meetup) => new Date(meetup.date) > today
    );

    const renderedMeetups = screen.queryAllByRole("listitem");

    expect(renderedMeetups.length).toBe(filteredMeetups.length);
  });
});
