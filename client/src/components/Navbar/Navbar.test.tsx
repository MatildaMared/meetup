import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {MemoryRouter} from 'react-router-dom'
import Navbar from "./Navbar";
import '@testing-library/jest-dom'

describe("navbar component", () => {

  it("renders without crashing", () => {
    render(
      
        <Navbar />, {wrapper: MemoryRouter}
    );
  });

  it("shows links Home, Login, Sign up when user is not logged in", () => {
    render(
      <Navbar />, {wrapper: MemoryRouter}
    );
    const listitems = screen.getAllByRole("listitem");

    expect(listitems.length).toBe(3);
    expect(listitems[0]).toHaveTextContent("Home");
    expect(listitems[1]).toHaveTextContent("Login");
    expect(listitems[2]).toHaveTextContent("Sign up");
  });
});

//Run this tests when able to sign in
//user can only see login and sign up links when not logged in
//user can only see Logout link when logged in
