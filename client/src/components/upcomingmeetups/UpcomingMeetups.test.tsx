import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UpcomingMeetups from "./UpcomingMeetups";

jest.mock("react-router-dom", () => {
  return {
    useNavigate: jest.fn(),
  };
});

// describe("Upcoming meetups component", () => {
//   it("renders without crashing", () => {
//     render(<UpcomingMeetups />);
//   });

//   it("displays heading with text 'Upcoming Meetups'", () => {
//     render(<UpcomingMeetups />);
//     const header = screen.getByRole("heading", { level: 2 });
//     const text = "Upcoming Meetups";
//     expect(header).toHaveTextContent(text);
//   });

//   it("displays meetupCards", () => {
//     render(<UpcomingMeetups />);
//     const listItems = screen.queryAllByRole("listitem");
//     console.log(listItems)
//     expect(listItems).not.toBeNull();
//   });

//   it("displays title of meetup in every card", () => {
//     render(<UpcomingMeetups />);
//     const listItems = screen.queryAllByRole("listitem");
//     const headers = screen.getAllByRole("heading", { level: 3 });

//     expect(listItems).not.toBeNull();
//     expect(headers).toBeInTheDocument();
//     expect(listItems.length === headers.length).toBeTruthy();
//   })
// });

//displays address of meetup in card
//dispalys time and date of meetup in card
//links to single meetup page when user clicks card
