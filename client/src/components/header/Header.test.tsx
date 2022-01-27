import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("navbar component", () => {
  it("renders without crashing", () => {
    render(<Header />);
  });

  it("renders the correct heading text", () => {
    render(<Header />);

    const headingText = screen.getByText(/Meetups/i);

    expect(headingText).toBeInTheDocument();
  });

  it("renders the correct subheading text", () => {
    render(<Header />);

    const subHeadingText = screen.getByText(/When's your next meetup?/i);

    expect(subHeadingText).toBeInTheDocument();
  });
});
