import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";

describe("LoginPage component", () => {
  it("renders without crashing", () => {
    render(<LoginPage />);
  });

  it("displays two input fields", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("displays a submit button", () => {
    render(<LoginPage />);
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("displays an error message if user clicks button when input fields are empty", () => {
    render(<LoginPage />);
    const submitButton = screen.getByRole("button", { name: "Login" });
    submitButton.click();
    expect(
      screen.getByText("Please enter username and password")
    ).toBeInTheDocument();
  });
});
