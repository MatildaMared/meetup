import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScriptElementKind } from "typescript";
import UpcomingMeetups from "./UpcomingMeetups";

describe("Upcoming meetups component", () => {
  it("renders without crashing", () => {
    render(<UpcomingMeetups />);
  });

  it("displays heading with text 'Upcoming Meetups'", () => {
    render(<UpcomingMeetups />);
    const header = screen.getByRole("heading");
    const text = "Upcoming Meetups"
    expect(header).toHaveTextContent(text);   
  });

  it("displays 5 number of meetupCards", () => {

  })
});


//displays title of meetup in card
//displays name of organizer of meetup in card
//displays address of meetup in card
//dispalys time and date of meetup in card
//links to single meetup page when user clicks card
