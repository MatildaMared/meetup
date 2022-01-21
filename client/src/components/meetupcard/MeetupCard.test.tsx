import { render, screen } from "@testing-library/react";
import MeetupCard from "./MeetupCard";
import { MeetupContext } from "../../context/MeetupContext";
import { useContext } from "react";

describe("Testing for MeetupCard", () => {
  const [context, updateContext] = useContext(MeetupContext);

  it("render without crashing", () => {
    render(<MeetupCard />);
  });

  // it("render an h2 with the title for the event", () => {
  //   render(<MeetupCard />);

  //   const title = screen.getByRole("heading", {
  //     name: "Kodkväll för nybörjare",
  //   });
  //   expect(title).toBeInTheDocument();
  // });

  // render the card-image for the event
  // render an small element with the ownder and the time for the event
  // render the event description for the event
});
