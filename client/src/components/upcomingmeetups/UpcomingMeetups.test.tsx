import { useContext } from "react";
import { MeetupContext } from "../../context/MeetupContext";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MeetupProvider } from "../../context/MeetupContext";
import UpcomingMeetups from "./UpcomingMeetups";



  // const allMeetups: [{}] = [
  //   { id: "61ea80effe705abdc1db26e8",
  //     title: "Pokémon meetup (vi livesänder speedrun av pokémon Emerald på Twitch!)", 
  //   ownerId: "61ea80bcfe705abdc1db26e4",
  //   imgUrl: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025…G90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  //   location: "Online",
  //   date: "2022-03-10T17:00:00.000Z"
  //  }
  // ]

describe("Upcoming meetups component", () => {

  jest.mock('react', () => {
    const ActualReact = jest.requireActual('react')
    return {
      ...ActualReact,
      useContext: () => ({
           id: "61ea80effe705abdc1db26e8",
            title: "Pokémon meetup (vi livesänder speedrun av pokémon Emerald på Twitch!)", 
          ownerId: "61ea80bcfe705abdc1db26e4",
          imgUrl: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025…G90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
          location: "Online",
          date: "2022-03-10T17:00:00.000Z"
       }), // what you want to return when useContext get fired goes here
    }
  })
  
  it("renders without crashing", () => {
    render(
      <MeetupProvider>
        <UpcomingMeetups />
      </MeetupProvider>
    );
  });

  it("displays heading with text 'Upcoming Meetups'", () => {
    render(
      <MeetupProvider>
        <UpcomingMeetups />
      </MeetupProvider>
    );
    const header = screen.getByRole("heading");
    const text = "Upcoming Meetups";
    expect(header).toHaveTextContent(text);
  });

  it("displays 1 number of meetupCards", () => {
    render(
      <MeetupProvider>
        <UpcomingMeetups />
      </MeetupProvider>
    );
    const listitems = screen.getAllByRole("listitem");
    expect(listitems.length).toBe(1);
  });
});

//displays title of meetup in card
//displays name of organizer of meetup in card
//displays address of meetup in card
//dispalys time and date of meetup in card
//links to single meetup page when user clicks card
