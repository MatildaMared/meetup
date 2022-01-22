import { render, screen } from "@testing-library/react";
import MeetupCard from "./MeetupCard";
import { MeetupContext, MeetupProvider } from "../../context/MeetupContext";
import { useContext } from "react";

describe("Testing for MeetupCard", () => {
  // const customRender = (ui: any, { providerProps, ...renderOptions }) => {
  //   return render(
  //     <MeetupContext.Provider {...providerProps}>{ui}</MeetupContext.Provider>,
  //     renderOptions
  //   );
  // };
  // it("render without crashing", () => {
  //   render(<MeetupCard />);
  // });
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
