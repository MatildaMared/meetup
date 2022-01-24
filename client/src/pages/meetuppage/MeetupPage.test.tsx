import { render } from "@testing-library/react";
import MeetupPage from "./MeetupPage";

describe("Testing for the MeetupPage", () => {
  it("render the MeetupPage component without crashing", () => {
    render(<MeetupPage />);
  });

  // it("checks that the MeetupCard-component is renderd in the MeetupPage", () => {
  //   const { getByText } = render(<MeetupPage />);
  //   expect(getByText(/submit/i)).toBeInTheDocument();
  // });

  it("checks that the Comment-component is renderd in the MeetupPage", () => {
    const { getByText } = render(<MeetupPage />);
    expect(getByText(/submit/i)).toBeInTheDocument();
  });
});
