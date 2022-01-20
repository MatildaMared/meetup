import { render } from "@testing-library/react";
import EventPage from "./EventPage";

describe("Testing for the EventPage", () => {
  it("render the EventPage component without crashing", () => {
    render(<EventPage />);
  });
});
