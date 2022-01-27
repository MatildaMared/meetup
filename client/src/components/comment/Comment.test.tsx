import { render, screen } from "@testing-library/react";
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

describe("Testing for Comment-form", () => {
  it("render without crashing", () => {
    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);
  });

  it("contains an input", () => {
    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);
    const inputElem = screen.queryByRole("textbox");
    expect(inputElem).toBeInTheDocument();
  });

  it("contains a button to submit with", () => {
    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeInTheDocument();
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

  it("displays an error message if there is no token saved in localstorage", () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => ""
    );
    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);

    userEvent.click(screen.getByText("Submit"));

    expect(
      screen.getByText("You must be logged in to write a comment")
    ).toBeInTheDocument();
  });

  it("displays the correct value in the textbox", () => {
    render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);
    const inputElem = screen.getByRole("textbox");
    userEvent.type(inputElem, "Hello");
    expect(inputElem).toHaveValue("Hello");
  });
});

 //   it("empties the input field when submitting the comment", () => {
  //     render(<Comment meetup={meetupMock} setMeetup={setMeetupMock} />);
  //     const inputElem = screen.getByRole("textbox");
  //     userEvent.type(inputElem, "Hello{enter}");
  //     expect(inputElem).toHaveValue("");
  //   });
// it("shows the post in the comments, after submitting")
//it("shows who posted the comment", () => {});
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
