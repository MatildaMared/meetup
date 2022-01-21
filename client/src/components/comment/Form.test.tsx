import { render, screen } from "@testing-library/react";
import Comment from "./Comment";

describe("Testing for Comment-form", () => {
  it("render without crashing", () => {
    render(<Comment />);
  });

  it("contains an input", () => {
    render(<Comment />);
    const inputElem = screen.queryByRole("textbox");
    expect(inputElem).toBeInTheDocument();
  });

  it("contains a button to submit with", () => {
    render(<Comment />);
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeInTheDocument();
  });

  // empties the input field when submitting the comment
  // shows the post in the comments, after submitting
  // shows who posted the comment over the comment itself
});
