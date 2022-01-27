import { render, screen } from "@testing-library/react";
import { singleMeetup } from "../../dummyData/meetups";
import { User } from "../../models/User";
import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
} from "../../services/localStorageService";
import MeetupCard from "./MeetupCard";
import AttendButton from "../attendMeetup/AttendButton";

const user: User = {
  username: "KlaraBella",
  firstName: "Bellis",
  id: "61ea80bcfe705abdc1db26e4",
};

let successfulFetchResponse = {
  success: true,
  token: "token",
  user: {
    id: 1,
    username: "username",
    firstName: "First Name",
  },
};

const props = {
  attending: false,
  setAttending: Function,
  isLoggedIn: true,
};

const setSingleMeetupMock = jest.fn();
const setIsLoggedInMock = jest.fn();

jest.mock("../../services/localStorageService", () => {
  return {
    saveUserInLocalStorage: jest.fn(),
    saveTokenInLocalStorage: jest.fn(),
    getTokenFromLocalStorage: jest.fn(),
    getUserFromLocalStorage: jest.fn(),
  };
});

jest.mock("../attendMeetup/AttendButton", () => {
  return () => {
    return <div>AttendButton</div>;
  };
});

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
}));

describe("Testing for MeetupCard", () => {
  it("render without crashing", () => {
    render(
      <MeetupCard
        meetup={singleMeetup}
        user={user}
        attending={props.attending}
        setAttending={setIsLoggedInMock}
        isLoggedIn={props.isLoggedIn}
        setSingleMeetup={setSingleMeetupMock}
      />
    );
  });

  it("render a heading with the title for the event", () => {
    render(
      <MeetupCard
        meetup={singleMeetup}
        user={user}
        attending={props.attending}
        setAttending={setIsLoggedInMock}
        isLoggedIn={props.isLoggedIn}
        setSingleMeetup={setSingleMeetupMock}
      />
    );
    const title = screen.getByText(singleMeetup.title);
    expect(title).toBeInTheDocument();
  });

  it("render the card-image for the event", () => {
    render(
      <MeetupCard
        meetup={singleMeetup}
        user={user}
        attending={props.attending}
        setAttending={setIsLoggedInMock}
        isLoggedIn={props.isLoggedIn}
        setSingleMeetup={setSingleMeetupMock}
      />
    );
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });

  it("render the name of the owner, for the event", () => {
    render(
      <MeetupCard
        meetup={singleMeetup}
        user={user}
        attending={props.attending}
        setAttending={setIsLoggedInMock}
        isLoggedIn={props.isLoggedIn}
        setSingleMeetup={setSingleMeetupMock}
      />
    );
    const username = screen.getByText(/bellis/i);
    expect(username).toBeInTheDocument();
  });

  it("render the title 'Event info' over the description", () => {
    render(
      <MeetupCard
        meetup={singleMeetup}
        user={user}
        attending={props.attending}
        setAttending={setIsLoggedInMock}
        isLoggedIn={props.isLoggedIn}
        setSingleMeetup={setSingleMeetupMock}
      />
    );
    const eventInfo = screen.getByText(/event info/i);
    expect(eventInfo).toBeInTheDocument();
  });

  it("render the event description for the event", () => {
    render(
      <MeetupCard
        meetup={singleMeetup}
        user={user}
        attending={props.attending}
        setAttending={setIsLoggedInMock}
        isLoggedIn={props.isLoggedIn}
        setSingleMeetup={setSingleMeetupMock}
      />
    );
    const description = screen.getByText(singleMeetup.description);
    expect(description).toBeInTheDocument();
  });

  it("replace the date and time, and render a more sutible timestamp", () => {
    render(
      <MeetupCard
        meetup={singleMeetup}
        user={user}
        attending={props.attending}
        setAttending={setIsLoggedInMock}
        isLoggedIn={props.isLoggedIn}
        setSingleMeetup={setSingleMeetupMock}
      />
    );
    const date = screen.getByText(/måndag 10 oktober 2022 19:00/i);
    expect(date).toBeInTheDocument();
  });

  it("does not render the Edit-button if you are not logged in", () => {
    (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
      () => ""
    );
    render(
      <MeetupCard
        meetup={singleMeetup}
        user={user}
        attending={props.attending}
        setAttending={setIsLoggedInMock}
        isLoggedIn={props.isLoggedIn}
        setSingleMeetup={setSingleMeetupMock}
      />
    );
    const button = screen.queryByRole("button", { name: /edit/ });
    expect(button).not.toBeInTheDocument();
  });

  // it("render the Edit-button if you are logged in", () => {
  //   (getTokenFromLocalStorage as jest.Mock<string>).mockImplementation(
  //     () => "token"
  //   );
  //   (getUserFromLocalStorage as jest.Mock<object>).mockImplementation(() => {
  //   });
  //   render(<MeetupCard meetup={singleMeetup} user={user} />);
  //   const button = screen.queryByRole("button", { name: /edit/ });
  //   expect(button).toBeInTheDocument();
  // });
});
