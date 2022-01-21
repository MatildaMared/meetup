import { render, screen } from "@testing-library/react";
import MeetupCard from "./MeetupCard";

const meetup = {
  id: 1,
  ownerId: 1736,
  title: "Kodkväll för nybörjare",
  category: "programming",
  description:
    "Cat ipsum dolor sit amet, it's 3am, time to create some chaos bathe private parts with tongue then lick owner's face hell is other people so cat sit like bread. Lay on arms while you're using the keyboard put butt in owner's face or make it to the carpet before i vomit mmmmmm and claw drapes, and refuse to drink water except out of someone's glass. Why dog in house? i'm the sole ruler of this home and its inhabitants smelly, stupid dogs, inferior furballs time for night-hunt, human freakout mice blow up sofa in 3 seconds why can't i catch that stupid red dot. Kitty time. Steal mom's crouton while she is in the bathroom instead of drinking water from the cat bowl, make sure to steal water from the toilet and intrigued by the shower, but give me attention or face the wrath of my claws scratch me now! stop scratching me! scratch my tummy actually i hate you now fight me yet the cat was chasing the mouse. Kitty loves pigs eat owner's food, get video posted to internet for chasing red dot so jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans and mark territory, but intently sniff hand. Cats are a queer kind of folk hate dogs, for flee in terror at cucumber discovered on floor, yet kitty poochy i vomit in the bed in the middle of the night.",
  date: new Date("2022-02-18T18:00:00"),
  location: "Mr Cake, Lilla Badhusgatan 2b, Göteborg",
  imgUrl:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
  attendees: [
    { name: "Matilda", id: 1736 },
    { name: "Sofia", id: 1319 },
    { name: "Sara", id: 7382 },
  ],
  comments: [
    {
      name: "Matilda",
      comment: "This is a great meetup!",
    },
  ],
};

// describe("Testing for MeetupCard", () => {
//   it("render without crashing", () => {
//     render(<MeetupCard meetup={meetup} />);
//   });

//   it("render an h2 with the title for the event", () => {
//     render(<MeetupCard meetup={meetup} />);

//     const title = screen.getByRole("heading", {
//       name: "Kodkväll för nybörjare",
//     });
//     expect(title).toBeInTheDocument();
//   });

//   // render the card-image for the event
//   // render an small element with the ownder and the time for the event
//   // render the event description for the event
// });
