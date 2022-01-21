import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("LoginForm component", () => {
  it("renders without crashing", () => {
    render(<LoginForm />);
  });

  it("displays two input fields", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("displays a submit button", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("displays an error message if user clicks button when input fields are empty", () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole("button", { name: "Login" });
    submitButton.click();
    expect(
      screen.getByText("Please enter username and password")
    ).toBeInTheDocument();
  });
});
