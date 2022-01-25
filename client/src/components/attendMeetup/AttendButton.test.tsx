import { render, screen } from "@testing-library/react";
import AttendButton from "./AttendButton";

const props = {
  attending: true,
  setAttending: Function,
};

describe("Tests For attending meetup-button", () => {
  it("render without crashing", () => {
    render(
      <AttendButton
        attending={props.attending}
        setAttending={props.setAttending}
      />
    );
  });

  // it("show an button where you can attend the meetup", async () => {
  //   render(
  //     <AttendButton
  //       attending={props.attending}
  //       setAttending={props.setAttending}
  //     />
  //   );
  //   const button = screen.getByText(/Attend Meetup/i);
  //   expect(button).toBeInTheDocument();
  // });

  // it('show a button with "leave meeting" if clicked to attend the event', async () => {
  //   render(
  //     <AttendButton
  //       attending={props.attending}
  //       setAttending={props.setAttending}
  //     />
  //   );
  //   const button = screen.getByRole("button", { name: /attend meetup/i });
  //   button.click();

  //   await waitFor(() => {
  //     expect(attendMeetup).toHaveBeenCalledWith(successfulFetchResponse.user);
  //   });

  //   const buttonleave = screen.getByText(/leave meetup/i);
  //   expect(buttonleave).toBeInTheDocument();
  // });
});
