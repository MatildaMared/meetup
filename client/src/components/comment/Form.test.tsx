import { render, screen } from "@testing-library/react";
import Form from "./Form";

describe("Testing for Comment-form", () => {
  it("render without crashing", () => {
    render(<Form />);
  });

  it("contains an input", () => {
    render(<Form />);
    const inputElem = screen.queryByRole("textbox");

    expect(inputElem).toBeInTheDocument();
  });

  it("contains a button to submit with", () => {
    render(<Form />);
    const button = screen.getByRole("button", { name: "Submit" });

    expect(button).toBeInTheDocument();
  });
});
