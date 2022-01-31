import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteCommentButton from "./DeleteCommentButton";
import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
} from "../../services/localStorageService";
import { Meetup } from "../../models/Meetup";
import { singleMeetup } from "../../dummyData/meetups";

let meetupMock: Meetup;
let setMeetupMock: jest.Mock;

let successfulPostResponse = {
  success: true,
  meetup: singleMeetup,
};

jest.mock("../../services/localStorageService", () => {
  return {
    getTokenFromLocalStorage: jest.fn(),
    getUserFromLocalStorage: jest.fn(),
  };
});

beforeEach(() => {
  meetupMock;
  setMeetupMock = jest.fn();
});

//more tests in Comment.test.tsx

describe("deleteCommentButton component", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(successfulPostResponse),
      })
    ) as jest.Mock<any>;
  });

  it("renders without crashing", () => {
    render(
      <DeleteCommentButton meetup={meetupMock} setMeetup={setMeetupMock} />
    );
  });

  it("calls delete function when valid user clicks the delete button", async () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );

    render(
      <DeleteCommentButton meetup={meetupMock} setMeetup={setMeetupMock} />
    );

    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    await waitFor(() => {
      expect(setMeetupMock.mock.calls.length).toBe(1);
    });
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
