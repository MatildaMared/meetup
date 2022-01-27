import { render, screen } from "@testing-library/react";
import AllMeetups from "./AllMeetups";
import { meetups } from "../../dummyData/meetups";

// Set up mock for useNavigate from react-router-dom

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
}));

describe("AllMeetups component", () => {
  it("renders without crashing", () => {
    render(<AllMeetups meetups={meetups} />);
  });

  it("displays a title", () => {
    render(<AllMeetups meetups={meetups} />);

    expect(screen.getByText(/All meetups/i)).toBeInTheDocument();
  });

  it("displays a list of meetups", () => {
    render(<AllMeetups meetups={meetups} />);

    const firstElementTitle = meetups[0].title;
    const lastElementTitle = meetups[meetups.length - 1].title;

    expect(screen.getByText(firstElementTitle)).toBeInTheDocument();
    expect(screen.getByText(lastElementTitle)).toBeInTheDocument();

    const allMeetups = screen.queryAllByRole("listitem");
    expect(allMeetups.length).toBe(meetups.length);
  });

  it("displays meetups sorted alphabetically by title", () => {
    render(<AllMeetups meetups={meetups} />);

    const allTitles = meetups.map((meetup) => meetup.title);
    const sortedTitles = allTitles.sort();

    const allMeetups = screen.queryAllByRole("listitem");
    expect(allMeetups[0].textContent).toContain(sortedTitles[0]);
  });
});
