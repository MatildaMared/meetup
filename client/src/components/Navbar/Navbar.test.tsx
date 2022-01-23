import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";

describe("navbar component", () => {
  it("renders without crashing", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
  });

  it("shows links Home, Find Meetups, Sign in, Sign up when user is not logged in", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const listitems = screen.getAllByRole("listitem");

    expect(listitems.length).toBe(4);
    expect(listitems[0]).toHaveTextContent("Home");
    expect(listitems[1]).toHaveTextContent("Find Meetups");
    expect(listitems[2]).toHaveTextContent("Sign in");
    expect(listitems[3]).toHaveTextContent("Sign up");
  });
});

//Run this tests when able to sign in
//user can only see login and sign up page when not logged in
//user can only see My page and Sign out page when logged in

//   it("shows links Home, Find Meetups, My Page, Sign out when user is logged in", () => {
//     render(    <Router>
        // <Navbar />
        // </Router>);
//     const listitems = screen.getAllByRole("listitem");

//     expect(listitems.length).toBe(4);
//     expect(listitems[0]).toHaveTextContent("Home");
//     expect(listitems[1]).toHaveTextContent("Find Meetups");
//     expect(listitems[2]).toHaveTextContent("My Page");
//     expect(listitems[3]).toHaveTextContent("Sign out");
//   });
