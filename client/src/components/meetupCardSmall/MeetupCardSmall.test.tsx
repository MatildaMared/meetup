import { render, screen } from "@testing-library/react";
import MeetupCardSmall from "./MeetupCardSmall";
import { singleMeetup } from "./../../dummyData/meetups";

// Set up mock for useNavigate from react-router-dom
const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
}));

// Actual tests
describe("MeetupCardSmall component", () => {
  it("renders without crashing", () => {
    render(<MeetupCardSmall meetup={singleMeetup} />);
  });

  it("displays a title", () => {
    render(<MeetupCardSmall meetup={singleMeetup} />);

    expect(screen.getByText(singleMeetup.title)).toBeInTheDocument();
  });

  it("displays a location", () => {
    render(<MeetupCardSmall meetup={singleMeetup} />);

    expect(screen.getByText(singleMeetup.location)).toBeInTheDocument();
  });

  it("displays a date", () => {
    const date = new Date(singleMeetup.date).toLocaleString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    render(<MeetupCardSmall meetup={singleMeetup} />);

    expect(screen.getByText(date)).toBeInTheDocument();
  });

  it("displays an image", () => {
    render(<MeetupCardSmall meetup={singleMeetup} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("redirects user to meetup page if element is clicked", () => {
    render(<MeetupCardSmall meetup={singleMeetup} />);

    const meetupElement = screen.getByRole("listitem");

    meetupElement.click();

    expect(mockedNavigator).toHaveBeenCalledWith(`/meetups/${singleMeetup.id}`);
  });
});
