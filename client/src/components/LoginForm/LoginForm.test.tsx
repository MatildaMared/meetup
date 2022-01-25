import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  saveTokenInLocalStorage,
  saveUserInLocalStorage,
} from "../../services/localStorageService";
import LoginForm from "./LoginForm";

// Dummy fetch responses

let successfulFetchResponse = {
  success: true,
  token: "token",
  user: {
    id: 1,
    username: "username",
    firstName: "First Name",
  },
};

let unsuccessfulFetchResponse = {
  success: false,
  error: "Error message",
};

// Set up mock for localStorageService

jest.mock("../../services/localStorageService", () => {
  return {
    saveUserInLocalStorage: jest.fn(),
    saveTokenInLocalStorage: jest.fn(),
  };
});

// Set up mock for useNavigate from react-router-dom

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
}));

// Actual tests

describe("LoginForm component", () => {
  it("renders without crashing", () => {
    render(<LoginForm />);
  });

  it("displays two input fields", async () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("displays a submit button", async () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("displays an error message if user clicks button when input fields are empty", async () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole("button", { name: "Login" });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter username and password")
      ).toBeInTheDocument();
    });
  });

  describe("If login is successful", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(successfulFetchResponse),
        })
      ) as jest.Mock<any>;
    });

    it("calls the navigate function to redirect user to the home page", async () => {
      render(<LoginForm />);
      const usernameInput = screen.getByLabelText("Username");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Login" });

      userEvent.type(usernameInput, "username");
      userEvent.type(passwordInput, "password");

      userEvent.click(submitButton);

      await waitFor(() => {
        expect(mockedNavigator).toHaveBeenCalledWith("/");
      });
    });

    it("saves token and user in local storage", async () => {
      render(<LoginForm />);

      const usernameInput = screen.getByLabelText("Username");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Login" });

      userEvent.type(usernameInput, "username");
      userEvent.type(passwordInput, "password");
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(saveTokenInLocalStorage).toHaveBeenCalledWith(
          successfulFetchResponse.token
        );
      });

      await waitFor(() => {
        expect(saveUserInLocalStorage).toHaveBeenCalledWith(
          successfulFetchResponse.user
        );
      });
    });
    afterAll(() => {
      jest.clearAllMocks();
    });
  });

  describe("If login is unsuccessful", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(unsuccessfulFetchResponse),
        })
      ) as jest.Mock<any>;
    });

    it("displays an error message", async () => {
      render(<LoginForm />);

      const usernameInput = screen.getByLabelText("Username");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Login" });

      userEvent.type(usernameInput, "username");
      userEvent.type(passwordInput, "password");
      submitButton.click();

      await waitFor(() => {
        expect(screen.getByText("Error message")).toBeInTheDocument();
      });
    });

    it("does not try to save user and token to local storage", async () => {
      render(<LoginForm />);

      const usernameInput = screen.getByLabelText("Username");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Login" });

      userEvent.type(usernameInput, "username");
      userEvent.type(passwordInput, "password");
      submitButton.click();

      await waitFor(() => {
        expect(saveTokenInLocalStorage).not.toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(saveUserInLocalStorage).not.toHaveBeenCalled();
      });
    });

    it("does not redirect the user to homepage", async () => {
      render(<LoginForm />);

      const usernameInput = screen.getByLabelText("Username");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Login" });

      userEvent.type(usernameInput, "username");
      userEvent.type(passwordInput, "password");
      submitButton.click();

      await waitFor(() => {
        expect(mockedNavigator).not.toHaveBeenCalled();
      });
    });

    afterAll(() => {
      jest.clearAllMocks();
    });
  });
});
