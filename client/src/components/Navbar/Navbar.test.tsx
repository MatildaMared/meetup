import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

describe("navbar component", () => {
  it("renders without crashing", () => {
    render(<Navbar />);
  });

  it("shows links Home, Find Meetups, Sign in, Sign up when user is not logged in", () => {
    render(<Navbar />);
    const listitems = screen.getAllByRole("listitem");

    expect(listitems.length).toBe(4);
    expect(listitems[0]).toHaveTextContent("Home");
    expect(listitems[1]).toHaveTextContent("Find Meetups");
    expect(listitems[2]).toHaveTextContent("Sign in");
    expect(listitems[3]).toHaveTextContent("Sign up");
  });

  it("selected class is activated on Home when user enters page", () => {
    render(<Navbar />);
    const selectedLi = screen.getByText("Home");
    expect(selectedLi).toHaveClass("selected");
  });

  it("selected-class is activated when user selects link Find Meetups", () => {
    render(<Navbar />);
    const selectedLi = screen.getByText("Find Meetups");
    userEvent.click(selectedLi);
    expect(selectedLi).toHaveClass("selected");
  });

  it("selected-class is activated when user selects link Sign in", () => {
    render(<Navbar />);
    const selectedLi = screen.getByText("Sign in");
    userEvent.click(selectedLi);
    expect(selectedLi).toHaveClass("selected");
  });

  it("selected-class is activated when user selects link Sign up", () => {
    render(<Navbar />);
    const selectedLi = screen.getByText("Find Meetups");
    userEvent.click(selectedLi);
    expect(selectedLi).toHaveClass("selected");
  });

  //Run this tests when able to sign in
  //user can only see login and sign up page when not logged in
  //user can only see My page and Sign out page when logged in

  //   it("shows links Home, Find Meetups, My Page, Sign out when user is logged in", () => {
  //     render(<Navbar items={items} />);
  //     const listitems = screen.getAllByRole("listitem");

  //     expect(listitems.length).toBe(4);
  //     expect(listitems[0]).toHaveTextContent("Home");
  //     expect(listitems[1]).toHaveTextContent("Find Meetups");
  //     expect(listitems[2]).toHaveTextContent("My Page");
  //     expect(listitems[3]).toHaveTextContent("Sign out");
  //   });
});
