import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  saveTokenInLocalStorage,
  saveUserInLocalStorage,
} from "../../services/localStorageService";
import LoginForm from "./LoginForm";

// Dummy fetch response

let fetchResponse = {
  success: true,
  token: "token",
  user: {
    id: 1,
    username: "username",
    firstName: "First Name",
  },
};

// Set up mock for localStorageService

jest.mock("../../services/localStorageService", () => {
  return {
    saveUserInLocalStorage: jest.fn(),
    saveTokenInLocalStorage: jest.fn(),
  };
});

// Set up mock for useNavigate from react-router-dom

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
}));

const mockedNavigator = jest.fn();

// Actual tests

describe("LoginForm component", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fetchResponse),
      })
    ) as jest.Mock<any>;
  });

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

  it("calls the navigate function to redirect user to the home page after entering correct credentials", async () => {
    render(<LoginForm />);
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    userEvent.type(usernameInput, "username");
    userEvent.type(passwordInput, "password");
    submitButton.click();

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/");
    });
  });

  it("saves token and user in local storage after logging in successfully", async () => {
    render(<LoginForm />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    userEvent.type(usernameInput, "username");
    userEvent.type(passwordInput, "password");
    submitButton.click();

    await waitFor(() => {
      expect(saveTokenInLocalStorage).toHaveBeenCalledWith("token");
    });

    await waitFor(() => {
      expect(saveUserInLocalStorage).toHaveBeenCalledWith(fetchResponse.user);
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
