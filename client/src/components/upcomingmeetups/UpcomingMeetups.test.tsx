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
});


//displays * number of cards
//displays ability to scroll horizontally
