import { render } from "@testing-library/react";
import AttendButton from "./AttendButton";
import { Meetup } from "../../models/Meetup";
import { User } from "../../models/User";

const meetup: Meetup = {
  title: "Kodkväll för nybörjare",
  ownerId: "61ea80bcfe705abdc1db26e4",
  category: "programmering",
  description:
    "Cat ipsum dolor sit amet, it's 3am, time to furballs time for night-hunt, human freakout mice blow up sofa in 3 seconds why caf hand. Cats are a queer kind of folk hate dogs, for flee in terror at cucumber discovered on floor, yet kitty poochy i vomit in the bed in the middle of the night.",
  date: "2022-03-10T17:00:00.000Z",
  location: "Online",
  imgUrl:
    "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  attendees: [
    {
      name: "Sofia",
      id: "sjdfhgksjdhferif",
    },
  ],
  comments: [
    {
      id: "sdfsgsg",
      userId: "kgjhlksrh",
      content: "",
    },
  ],
  id: "61ea80effe705abdc1db26e8",
};

const user: User = {
  username: "Greeeger",
  firstName: "Greger",
  id: "61ea80bcfe705abdc1db26e4",
};

describe("Tests For attending meetup-button", () => {
  render(<AttendButton meetup={meetup} user={user} />);
});