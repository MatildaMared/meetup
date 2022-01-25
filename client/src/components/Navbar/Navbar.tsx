import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

function Navbar() {
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem("meetupToken");
    localStorage.removeItem("meetupUser");
    navigate("/");
  }

  //Om användaren är inloggad ska den kunna skapa nya meetups
  //LOgga ut knapp istället för logga in när anvädaren har loggat in. clear LS och till Home

  return (
    <NavbarWrapper>
      <ListWrapper>
        <ListElement>
          <button onClick={() => navigate("/")} style={{ color: "#fff", textDecoration: "none" }}>
            Home
          </button>
        </ListElement>
        {!localStorage.meetupToken && !localStorage.meetupUser && (
          <ListElement>
            <button  onClick={() => navigate("/login")} style={{ color: "#fff", textDecoration: "none" }}>
              Login
            </button>
          </ListElement>
        )}
        {!localStorage.meetupToken && !localStorage.meetupUser && (
          <ListElement>
            <button
              onClick={() => navigate("/signup")}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Sign up
            </button>
          </ListElement>
        )}
        {localStorage.meetupToken && localStorage.meetupUser && (
          <ListElement>
            <button
              onClick={() => navigate("/create")}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Create Meetup
            </button>
          </ListElement>
        )}
        {localStorage.meetupToken && localStorage.meetupUser && (
          <ListElement>
            <button
              onClick={() => logoutHandler()}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Logout
            </button>
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
`;

// const StyledLink  = styled(Link)`
//   text-decoration: none;
//   color: #eee;
// `;

export default Navbar;
