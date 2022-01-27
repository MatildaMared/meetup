import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Comment from "./Comment";
import { getTokenFromLocalStorage } from "../../services/localStorageService";
import { Meetup } from "../../models/Meetup";
import { UserComment } from "../../models/UserComment";

let meetupMock: Meetup;
let setMeetupMock: jest.Mock;
// let commentMock: jest.Mock = createMeetup;

let successfulPostResponse = {
  comment: "Hej",
  id: "gerwq21",
  userId: "gdaga",
  name: "Sara",
};

let unsuccessfulPostResponse = {
  success: false,
  error: "Error message",
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
  //   commentMock = createComment();
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

  it("empties the input field when submitting the comment", async () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );
    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);
    const button = screen.getByRole("button", { name: "Submit" });
    const inputElem = screen.getByRole("textbox");
    userEvent.type(inputElem, "Hello");
    userEvent.click(button);
    
    // await waitFor(() => {
      expect(inputElem).toHaveValue("");
    // });
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

  it("displays the post in the comments, after submitting", async () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => "token"
    );

    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);

    const inputElem = screen.getByRole("textbox");
    userEvent.type(inputElem, "This is a dummy comment");

    await waitFor(() => {
      expect(screen.getByText("This is a dummy comment")).toBeInTheDocument();
    });
  });
});

//it("does not delete a comment when user is not owner of meetup or person who wrote the comment", () => {})
//it("deletes a comment when valid user clicks the delete button", () => {})

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

// function createComment(): UserComment {
//     return {
//         comment: "Hej",
//         id: "gerwq21",
//         userId: "gdaga",
//         name: "Sara"
//     };
// }
