import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Comment from "./Comment";
import { getTokenFromLocalStorage } from "../../services/localStorageService";
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
  meetupMock = createMeetup();
  setMeetupMock = jest.fn();
});

describe("Testing for Comment component", () => {
  it("render without crashing", () => {
    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);
  });

  //Input and sumbit elements
  it("contains an input when logged in", () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );
    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);
    const inputElem = screen.getByRole("textbox");
    expect(inputElem).toBeInTheDocument();
  });

  it("does not contain input element when logged out", () => {
    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);
    const inputElem = screen.queryByRole("textbox");
    expect(inputElem).not.toBeInTheDocument();
  });

  it("contains a button to submit with when logged in", () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );
    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeInTheDocument();
  });

  it("does not contain submit button when logged out", () => {
    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);
    const button = screen.queryByRole("button", { name: "Submit" });
    expect(button).not.toBeInTheDocument();
  });

  it("displays an error message if input field is empty", () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );
    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);

    userEvent.click(screen.getByText("Submit"));

    expect(
      screen.getByText("Please write a comment before submiting")
    ).toBeInTheDocument();
  });

  it("displays the correct value in the textbox", () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );
    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);
    const inputElem = screen.getByRole("textbox");
    userEvent.type(inputElem, "Hello");
    expect(inputElem).toHaveValue("Hello");
  });
});

describe("if comment was created succesfully", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(successfulPostResponse),
      })
    ) as jest.Mock<any>;
  });

  it("empties the input field when submitting the comment", async () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );
    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);
    const button = screen.getByRole("button", { name: "Submit" });
    const inputElem = screen.getByRole("textbox");
    userEvent.type(inputElem, "Hello");
    userEvent.click(button);
    

    await waitFor(() => {
      expect(inputElem).toHaveValue("");
    });
  });

  it("to call fetch when submitting", async () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );

    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);
    const button = screen.getByRole("button", { name: "Submit" });
    const inputElem = screen.getByRole("textbox");
    userEvent.type(inputElem, "This is a dummy comment");
    userEvent.click(button);

    //console.log(setMeetupMock.mock.calls[0]);
    
    await waitFor(() => {
      expect(setMeetupMock.mock).toHaveBeenCalled();
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});

function createMeetup(): Meetup {
  return {
    id: "1",
    title: "Test",
    category: "gaming",
    description: "Test",
    date: "2022-01-01T19:00",
    location: "Test",
    imgUrl: "https://",
    attendees: [],
    comments: [],
    ownerId: "1",
  };
}

