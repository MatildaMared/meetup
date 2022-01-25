import { render, screen, waitFor } from "@testing-library/react";
import SignupForm from "./SignupForm";
import userEvent from "@testing-library/user-event";
import {
  saveTokenInLocalStorage,
  saveUserInLocalStorage,
} from "../../services/localStorageService";

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

describe("SignupForm component", () => {
  it("renders without crashing", () => {
    render(<SignupForm />);
  });

  it("displays four input fields", () => {
    render(<SignupForm />);

    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();
  });

  it("displays a submit button", () => {
    render(<SignupForm />);

    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it("displays an error message when the passwords do not match", () => {
    render(<SignupForm />);

    const passwordInput = screen.getByLabelText("Password");
    const passwordConfirmInput = screen.getByLabelText("Confirm password");
    const buttonElement = screen.getByRole("button", { name: "Sign up" });

    userEvent.type(passwordInput, "password");
    userEvent.type(passwordConfirmInput, "nomatch");
    userEvent.click(buttonElement);

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("displays an error message if any field is empty", async () => {
    render(<SignupForm />);

    const buttonElement = screen.getByRole("button", { name: "Sign up" });

    userEvent.click(buttonElement);

    expect(screen.getByText("Please fill in all fields")).toBeInTheDocument();
  });

  describe("If signup was successful", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(successfulFetchResponse),
        })
      ) as jest.Mock<any>;
    });

    it("displays a success message on screen", async () => {
      render(<SignupForm />);

      const buttonElement = screen.getByRole("button", { name: "Sign up" });

      userEvent.type(screen.getByLabelText("First name"), "First Name");
      userEvent.type(screen.getByLabelText("Username"), "username");
      userEvent.type(screen.getByLabelText("Password"), "password");
      userEvent.type(screen.getByLabelText("Confirm password"), "password");

      userEvent.click(buttonElement);

      await waitFor(() => {
        expect(
          screen.getByText(
            "Signed up successfully! Redirecting to homepage in 5 seconds.."
          )
        ).toBeInTheDocument();
      });
    });

    it("saves the token in localStorage", async () => {
      render(<SignupForm />);

      const buttonElement = screen.getByRole("button", { name: "Sign up" });

      userEvent.type(screen.getByLabelText("First name"), "First Name");
      userEvent.type(screen.getByLabelText("Username"), "username");
      userEvent.type(screen.getByLabelText("Password"), "password");
      userEvent.type(screen.getByLabelText("Confirm password"), "password");

      userEvent.click(buttonElement);

      await waitFor(() => {
        expect(saveTokenInLocalStorage).toHaveBeenCalledWith(
          successfulFetchResponse.token
        );
      });
    });

    it("saves the user in localStorage", async () => {
      render(<SignupForm />);

      const buttonElement = screen.getByRole("button", { name: "Sign up" });

      userEvent.type(screen.getByLabelText("First name"), "First Name");
      userEvent.type(screen.getByLabelText("Username"), "username");
      userEvent.type(screen.getByLabelText("Password"), "password");
      userEvent.type(screen.getByLabelText("Confirm password"), "password");

      userEvent.click(buttonElement);

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

  describe("If signup was unsuccessful", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(unsuccessfulFetchResponse),
        })
      ) as jest.Mock<any>;
    });

    it("displays an error message on screen", async () => {
      render(<SignupForm />);

      const buttonElement = screen.getByRole("button", { name: "Sign up" });

      userEvent.type(screen.getByLabelText("First name"), "First Name");
      userEvent.type(screen.getByLabelText("Username"), "username");
      userEvent.type(screen.getByLabelText("Password"), "password");
      userEvent.type(screen.getByLabelText("Confirm password"), "password");

      userEvent.click(buttonElement);

      await waitFor(() => {
        expect(
          screen.getByText(unsuccessfulFetchResponse.error)
        ).toBeInTheDocument();
      });
    });

    it("does not try to save token in local storage", async () => {
      render(<SignupForm />);

      const buttonElement = screen.getByRole("button", { name: "Sign up" });

      userEvent.type(screen.getByLabelText("First name"), "First Name");
      userEvent.type(screen.getByLabelText("Username"), "username");
      userEvent.type(screen.getByLabelText("Password"), "password");
      userEvent.type(screen.getByLabelText("Confirm password"), "password");

      userEvent.click(buttonElement);

      await waitFor(() => {
        expect(saveTokenInLocalStorage).not.toHaveBeenCalled();
      });
    });

    it("does not try to save user in local storage", async () => {
      render(<SignupForm />);

      const buttonElement = screen.getByRole("button", { name: "Sign up" });

      userEvent.type(screen.getByLabelText("First name"), "First Name");
      userEvent.type(screen.getByLabelText("Username"), "username");
      userEvent.type(screen.getByLabelText("Password"), "password");
      userEvent.type(screen.getByLabelText("Confirm password"), "password");

      userEvent.click(buttonElement);

      await waitFor(() => {
        expect(saveUserInLocalStorage).not.toHaveBeenCalled();
      });
    });

    afterAll(() => {
      jest.clearAllMocks();
    });
  });
});
