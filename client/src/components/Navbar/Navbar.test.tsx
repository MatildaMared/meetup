import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {getTokenFromLocalStorage} from "../../services/localStorageService";
import Navbar from "./Navbar";

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

// Set up mock for localStorageService

jest.mock("../../services/localStorageService", () => {
  return {
    getTokenFromLocalStorage: jest.fn(),
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

    const button = screen.getByText("Home");
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

  it("does not show links Login and Sign up", () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );

    render(<Navbar />);
    expect(screen.queryByText("Login")).toBe(null);
    expect(screen.queryByText("Sign up")).toBe(null);
  });

  it("shows links Home, Create Meetup and Logout", () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
      );
    render(<Navbar />);

    expect(screen.getByText("Home" )).toBeInTheDocument();
    expect(screen.getByText("Create Meetup")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("user is redirected to HomePage when clicks Logout", async () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );
    render(<Navbar />);
    const logoutLink = screen.getByText("Logout");
    userEvent.click(logoutLink);

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/");
    });
  });

  it("user is redirected to CreatePage when clicks Create Meetup", async () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
      );
      render(<Navbar />);

      const createLink = screen.getByText("Create Meetup");
    userEvent.click(createLink);

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/create");
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});

describe("if user is not logged in", () => {
  it("shows links Home, Login, Sign up", () => {
    render(<Navbar />);
    const listitems = screen.getAllByRole("listitem");
    expect(listitems.length).toBe(3);
    expect(listitems[0]).toHaveTextContent("Home");
    expect(listitems[1]).toHaveTextContent("Login");
    expect(listitems[2]).toHaveTextContent("Sign up");
  });

  it("does not show links Create Meetup and Logout", () => {
    render(<Navbar />);

    expect(screen.queryByText("Create Meetup")).not.toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  it("user is redirected to LoginPage when click Login", async () => {
    render(<Navbar />);

    const loginLink = screen.getByText("Login");
    userEvent.click(loginLink);

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/login");
    });
  });

  it("user is redirected to SignupPage when click Sign up", async () => {
    render(<Navbar />);

    const signupLink = screen.getByText("Sign up");
    userEvent.click(signupLink);

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/signup");
    });
  });
});
