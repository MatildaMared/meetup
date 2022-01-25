import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  saveTokenInLocalStorage,
  saveUserInLocalStorage,
} from "../../services/localStorageService";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import "@testing-library/jest-dom";

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

//Tests

describe("navbar component", () => {
  it("renders without crashing", () => {
    render(<Navbar />);
  });

  it("user is redirected to HomePage when click Home", async () => {
    render(<Navbar />);

    const button = screen.getByRole("button", { name: "Home" });
    userEvent.click(button);

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/");
  });
  });
});

describe("if user is logged in", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(successfulFetchResponse),
      })
    ) as jest.Mock<any>;
  });

  // it("does not show links Login and Sign up", async () => { 
  //   (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(() => "token");

  //   render(<Navbar />); 

  //   await waitFor(() => {
  //     expect(screen.queryByRole("button", { name: "Login" })).not.toBeInTheDocument();
  //     expect(screen.queryByRole("button", { name: "Sign up" })).not.toBeInTheDocument();
  // });
  
  // });

  // it("shows links Home, Create Meetup and Logout", () => {
  //   render(<Navbar />, { wrapper: MemoryRouter });
  // });
  // it("user is redirected to HomePage when click Logout", () => {
  //   render(<Navbar />, { wrapper: MemoryRouter });
  // });
  // it("user is redirected to CreatePage when click Create Meetup", () => {
  //   render(<Navbar />, { wrapper: MemoryRouter });
  // });
  // it("localStorage is cleared when user logs out", () => {
  //   render(<Navbar />, { wrapper: MemoryRouter });
  // });

  afterAll(() => {
    jest.clearAllMocks();
  });
});

describe("if user is not logged in", () => {
  it("shows links Home, Login, Sign up", () => {
    render(<Navbar />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(3);
    expect(buttons[0]).toHaveTextContent("Home");
    expect(buttons[1]).toHaveTextContent("Login");
    expect(buttons[2]).toHaveTextContent("Sign up");
  });

  it("does not show links Create Meetup and Logout", () => {
    render(<Navbar />);

    expect(screen.queryByRole("button", { name: "Create Meetup" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Logout" })).not.toBeInTheDocument();
  });

  it("user is redirected to LoginPage when click Login", async () => {
    render(<Navbar />);

    const button = screen.getByRole("button", { name: "Login" });
    userEvent.click(button);

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/login");
  });
  });


  it("user is redirected to SignupPage when click Sign up", async () => {
    render(<Navbar />);

    const button = screen.getByRole("button", { name: "Sign up" });
    userEvent.click(button);

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/signup");
  });
  });
});