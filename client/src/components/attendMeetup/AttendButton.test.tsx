import { render, screen } from "@testing-library/react";
import AttendButton from "./AttendButton";

const setMeetupMock = jest.fn();
const setAttendingMock = jest.fn();

const testData = true;

describe("Tests For attending meetup-button", () => {
  it("render without crashing", () => {
    render(
      <AttendButton
        attending={testData}
        setAttending={setAttendingMock}
        setMeetup={setMeetupMock}
      />
    );
  });

  it("show an button where you can attend the meetup", async () => {
    render(
      <AttendButton
        attending={testData}
        setAttending={setAttendingMock}
        setMeetup={setMeetupMock}
      />
    );
    const button = screen.getByText(/Attend Meetup/i);
    expect(button).toBeInTheDocument();
  });

  it('show a button with "leave meeting" if clicked to attend the event', async () => {
    render(
      <AttendButton
        attending={testData}
        setAttending={setAttendingMock}
        setMeetup={setMeetupMock}
      />
    );
    const button = screen.getByRole("button", { name: /attend meetup/i });
    button.click();
    const buttonleave = screen.getByText(/Unattend meetup/i);
    expect(buttonleave).toBeInTheDocument();
  });
});
