import { render, screen } from "@testing-library/react";
import { singleMeetup } from "../../dummyData/meetups";
import Attendees from "./Attendees";

const noAttendeesTest = {
  title: "Programming",
  ownerId: "1",
  category: "programming",
  description: "Description",
  date: "2022-10-10T19:00:00",
  location: "Online",
  imgUrl:
    "https://images.unsplash.com/photo-1601933470096-0e34634ffcde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  attendees: [],
  comments: [
    {
      comment: "Så kul!",
      userId: "2",
      id: "378",
      name: "Testsson",
    },
  ],
  id: "234",
};

describe("Tests for attendees component", () => {
  it("renders without crashing", () => {
    render(<Attendees meetup={singleMeetup} />);
  });

  it("does not render any content if there are no attendes", () => {
    render(<Attendees meetup={noAttendeesTest} />);
    const items = screen.queryAllByRole("listitem");
    expect(items.length).toBe(0);
  });

  it("render an Attendee header if there are attendees", () => {
    render(<Attendees meetup={singleMeetup} />);
    const heading = screen.getByRole("heading", { name: "Attendees" });
    expect(heading).toBeInTheDocument();
  });

  it("does render a list of attendess if there are attendees", () => {
    render(<Attendees meetup={singleMeetup} />);
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(1);
  });
});
