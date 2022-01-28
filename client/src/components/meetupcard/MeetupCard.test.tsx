import { render, screen } from "@testing-library/react";
import { singleMeetup } from "../../dummyData/meetups";
import { User } from "../../models/User";
import MeetupCard from "./MeetupCard";
// import AttendButton from "../attendMeetup/AttendButton";

const user: User = {
  username: "KlaraBella",
  firstName: "Bellis",
  id: "61ea80bcfe705abdc1db26e4",
};

const trueProps = {
  attending: true,
  isLoggedIn: true,
  setAttending: Function,
};

const falseProps = {
  attending: false,
  isLoggedIn: false,
};

const setSingleMeetupMock = jest.fn();
const setIsLoggedInMock = jest.fn();

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
        attending={trueProps.attending}
        setAttending={setIsLoggedInMock}
        isLoggedIn={trueProps.isLoggedIn}
        setSingleMeetup={setSingleMeetupMock}
      />
    );
  });

  it("render the title 'Event info' over the description", () => {
    render(
      <MeetupCard
        meetup={singleMeetup}
        user={user}
        attending={trueProps.attending}
        setAttending={setIsLoggedInMock}
        isLoggedIn={trueProps.isLoggedIn}
        setSingleMeetup={setSingleMeetupMock}
      />
    );
    const eventInfo = screen.getByText(/event info/i);
    expect(eventInfo).toBeInTheDocument();
  });

  it("shows an attend-button on the page if logged in", () => {
    render(
      <MeetupCard
        meetup={singleMeetup}
        user={user}
        attending={trueProps.attending}
        setAttending={setIsLoggedInMock}
        isLoggedIn={trueProps.isLoggedIn}
        setSingleMeetup={setSingleMeetupMock}
      />
    );
    const button = screen.getByText(/AttendButton/i);
    expect(button).toBeInTheDocument();
  });

  it("does not show an attend-button on the page if not logged in", () => {
    render(
      <MeetupCard
        meetup={singleMeetup}
        user={user}
        attending={trueProps.attending}
        setAttending={setIsLoggedInMock}
        isLoggedIn={falseProps.isLoggedIn}
        setSingleMeetup={setSingleMeetupMock}
      />
    );
    const button = screen.queryByText(/AttendButton/i);
    expect(button).not.toBeInTheDocument();
  });
});

// Om man behöver kolla att någon som redan är attendad när den loggar in...
