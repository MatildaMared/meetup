import { render, screen } from "@testing-library/react";
import { meetups } from "../../dummyData/meetups";
import CategorySorter from "./CategorySorter";
import userEvent from "@testing-library/user-event";

const setMeetupsMock = jest.fn();

describe("CategorySorter component", () => {
  it("renders without crashing", () => {
    render(<CategorySorter meetups={meetups} setMeetups={setMeetupsMock} />);
  });

  it("displays a select element", () => {
    render(<CategorySorter meetups={meetups} setMeetups={setMeetupsMock} />);

    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
  });

  it("displays a select element with the correct options", () => {
    render(<CategorySorter meetups={meetups} setMeetups={setMeetupsMock} />);

    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(screen.getByText(/Gaming/i)).toBeInTheDocument();
    expect(screen.getByText(/Programming/i)).toBeInTheDocument();
  });

  it("calls setMeetups with the correct argument when the select element is changed", () => {
    render(<CategorySorter meetups={meetups} setMeetups={setMeetupsMock} />);

    userEvent.selectOptions(screen.getByLabelText(/Category/i), "Gaming");

    const filteredMeetups = [...meetups].filter(
      (meetup) => meetup.category === "gaming"
    );

    expect(setMeetupsMock.mock.calls[1][0]).toEqual(filteredMeetups);
  });

  it("calls setMeetups with the whole original array if select element is changed to 'All'", () => {
    render(<CategorySorter meetups={meetups} setMeetups={setMeetupsMock} />);

    userEvent.selectOptions(screen.getByLabelText(/Category/i), "Gaming");
    userEvent.selectOptions(screen.getByLabelText(/Category/i), "All");

    expect(setMeetupsMock.mock.calls[2][0]).toEqual(meetups);
  });
});
