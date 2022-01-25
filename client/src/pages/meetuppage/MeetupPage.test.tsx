import { render, screen } from "@testing-library/react";
import MeetupPage from "./MeetupPage";

const testData = {
  loggedIn: true,
};

describe("Testing for the MeetupPage", () => {
  it("render the MeetupPage component without crashing", () => {
    render(<MeetupPage />);
  });

  // it("render an attend-button if logged in", () => {
  //   render(<MeetupPage />);
  //   const button = screen.getByRole("button", { name: /Leave meetup/i });
  //   expect(button).toBeInTheDocument();
  // });

  // it("checks that the MeetupCard-component is renderd in the MeetupPage", () => {
  //   const { getByText } = render(<MeetupPage />);
  //   expect(getByText(/submit/i)).toBeInTheDocument();
  // });

  it("checks that the Comment-component is renderd in the MeetupPage", () => {
    const { getByText } = render(<MeetupPage />);
    expect(getByText(/submit/i)).toBeInTheDocument();
  });
});
