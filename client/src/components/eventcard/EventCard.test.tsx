import { render, screen } from "@testing-library/react";
import EventCard from "./EventCard";

const event = {
  name: "Hello",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, rem?",
};

describe("Testing for EventCard", () => {
  it("render without crashing", () => {
    render(<EventCard event={event} />);
  });

  it("render an h2 with the title for the event", () => {
    render(<EventCard event={event} />);

    const title = screen.getByRole("heading", { name: "Hello" });
    expect(title).toBeInTheDocument();
  });

  // render the card-image for the event
  // render an small element with the ownder and the time for the event
  // render the event description for the event
});
