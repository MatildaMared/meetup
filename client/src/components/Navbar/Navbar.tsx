import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { getTokenFromLocalStorage } from "../../services/localStorageService";

function Navbar() {
  const navigate = useNavigate();
  const token = getTokenFromLocalStorage();

  function logoutHandler() {
    localStorage.removeItem("meetupToken");
    localStorage.removeItem("meetupUser");
    navigate("/");
  }

  return (
    <NavbarWrapper>
      <ListWrapper>
        <ListElement onClick={() => navigate("/")}>Home</ListElement>
        {!token && (
          <ListElement onClick={() => navigate("/login")}>Login</ListElement>
        )}
        {!token && (
          <ListElement onClick={() => navigate("/signup")}>Sign up</ListElement>
        )}
        {token && (
          <ListElement onClick={() => navigate("/create")}>
              Create Meetup           
          </ListElement>
        )}
        {token && (
          <ListElement onClick={() => logoutHandler()}>
              Logout
          </ListElement>
        )}
      </ListWrapper>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.nav`
  background: #454545;
  height: 75px;
`;

const ListWrapper = styled.ul`
  display: flex;
  justify-content: space-evenly;
  list-style-type: none;
  padding-top: 20px;
`;

const ListElement = styled.li`
  cursor: pointer;
  color: #eee;
`;

export default Navbar;
