import { render } from "@testing-library/react";
import MeetupPage from "./MeetupPage";

describe("Testing for the EventPage", () => {
  it("render the MeetupPage component without crashing", () => {
    render(<MeetupPage />);
  });
});
