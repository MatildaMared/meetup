import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("empties the input field when submitting the comment", () => {
    render(<Comment />);
    const button = screen.getByRole("button", { name: "Submit" });
    const inputElem = screen.getByRole("textbox");
    userEvent.type(inputElem, "Hello");
    userEvent.click(button);
    expect(inputElem).toHaveValue("");
  });
  // shows the post in the comments, after submitting
  // shows who posted the comment over the comment itself

  // saves the comment to the user (if we should make it possible to delete later??)
});
