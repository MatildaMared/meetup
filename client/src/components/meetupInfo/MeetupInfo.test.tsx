import { render, screen } from "@testing-library/react";
import MeetupInfo from "./MeetupInfo";
import { singleMeetup } from "../../dummyData/meetups";
import { singleUser } from "../../dummyData/users";

describe("Test for MeetupInfo component", () => {
  it("render without crashing", () => {
    render(<MeetupInfo meetup={singleMeetup} user={singleUser} />);
  });

  it("render a heading with the title for the event", () => {
    render(<MeetupInfo meetup={singleMeetup} user={singleUser} />);
    const title = screen.getByText(singleMeetup.title);
    expect(title).toBeInTheDocument();
  });

  it("render the name of the owner, for the event", () => {
    render(<MeetupInfo meetup={singleMeetup} user={singleUser} />);
    const username = screen.getByText(/test/i);
    expect(username).toBeInTheDocument();
  });

  it("render the event description for the event", () => {
    render(<MeetupInfo meetup={singleMeetup} user={singleUser} />);
    const description = screen.getByText(singleMeetup.description);
    expect(description).toBeInTheDocument();
  });

  it("display the date and time for the event", () => {
    render(<MeetupInfo meetup={singleMeetup} user={singleUser} />);
    const date = screen.getByText(/måndag 10 oktober 2022 19:00/i);
    expect(date).toBeInTheDocument();
  });
});
