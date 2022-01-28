import { render, screen, waitFor } from "@testing-library/react";
import CreateForm from "./CreateForm";
import userEvent from "@testing-library/user-event";
import { getTokenFromLocalStorage } from "../../services/localStorageService";
import { singleUser } from "./../../dummyData/users";

// Dummy fetch responses

let successfulFetchResponse = {
  success: true,
  message: "Meetup deleted",
  user: singleUser,
};

let unsuccessfulFetchResponse = {
  success: false,
  error: "Error message",
};

// Set up mock for useNavigate from react-router-dom
const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
}));

// Set up mock for localStorageService
jest.mock("../../services/localStorageService", () => {
  return {
    saveUserInLocalStorage: jest.fn(),
    saveTokenInLocalStorage: jest.fn(),
    getTokenFromLocalStorage: jest.fn(),
    getUserFromLocalStorage: jest.fn(),
  };
});

describe("CreateForm component", () => {
  it("renders without crashing", () => {
    render(<CreateForm />);
  });

  it("displays seven input fields", () => {
    render(<CreateForm />);

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Time")).toBeInTheDocument();
    expect(screen.getByLabelText("Location")).toBeInTheDocument();
    expect(screen.getByLabelText("Image URL")).toBeInTheDocument();
  });

  it("displays a submit button", () => {
    render(<CreateForm />);

    expect(screen.getByText("Create Meetup")).toBeInTheDocument();
  });

  it("displays an error message if not all fields are filled out", () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );
    render(<CreateForm />);

    userEvent.click(screen.getByText("Create Meetup"));

    expect(screen.getByText("Please fill in all fields")).toBeInTheDocument();
  });

  it("displays an error message if there is no token saved in localstorage", () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => ""
    );
    render(<CreateForm />);

    userEvent.click(screen.getByText("Create Meetup"));

    expect(
      screen.getByText("You must be logged in to create a meetup")
    ).toBeInTheDocument();
  });

  describe("If meetup was created successfully", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(successfulFetchResponse),
        })
      ) as jest.Mock<any>;
    });

    it("displays a success message", async () => {
      (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
        () => "token"
      );

      render(<CreateForm />);

      userEvent.type(screen.getByLabelText("Title"), "Test");
      userEvent.selectOptions(screen.getByLabelText("Category"), "Gaming");
      userEvent.type(screen.getByLabelText("Description"), "Test");
      userEvent.type(screen.getByLabelText("Location"), "Location");

      userEvent.click(screen.getByText("Create Meetup"));

      await waitFor(() => {
        expect(
          screen.getByText(
            "Meetup created successfully! Redirecting to meetup page in 5 seconds."
          )
        ).toBeInTheDocument();
      });
    });

    afterAll(() => {
      jest.clearAllMocks();
    });
  });

  describe("If creating meetup was unsuccessful", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(unsuccessfulFetchResponse),
        })
      ) as jest.Mock<any>;
    });

    it("displays an error message", async () => {
      (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
        () => "token"
      );

      render(<CreateForm />);

      userEvent.type(screen.getByLabelText("Title"), "Test");
      userEvent.selectOptions(screen.getByLabelText("Category"), "Gaming");
      userEvent.type(screen.getByLabelText("Description"), "Test");
      userEvent.type(screen.getByLabelText("Location"), "Location");

      userEvent.click(screen.getByText("Create Meetup"));

      await waitFor(() => {
        expect(
          screen.getByText(unsuccessfulFetchResponse.error)
        ).toBeInTheDocument();
      });
    });

    afterAll(() => {
      jest.clearAllMocks();
    });
  });
});
