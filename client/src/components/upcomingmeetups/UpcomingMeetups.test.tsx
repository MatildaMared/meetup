
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UpcomingMeetups from "./UpcomingMeetups";

jest.mock("react-router-dom", () => {
  return {
    useNavigate: jest.fn(),
  };
});

describe("Upcoming meetups component", () => {
  it("renders without crashing", () => {
    render(<UpcomingMeetups />);
  });

  it("displays heading with text 'Upcoming Meetups'", () => {
    render(<UpcomingMeetups />);
    const header = screen.getByRole("heading");
    const text = "Upcoming Meetups";
    expect(header).toHaveTextContent(text);
  });

  it("displays 1 number of meetupCards", () => {
    // render(
    //   <Router>
    //     <UpcomingMeetups />
    //   </Router>
    // );
    // const listitems = screen.getAllByRole("listitem");
    // expect(listitems.length).toBe(1);
  });
});

//displays title of meetup in card
//displays name of organizer of meetup in card
//displays address of meetup in card
//dispalys time and date of meetup in card
//links to single meetup page when user clicks card
