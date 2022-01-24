import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

function Navbar() {
  const items = ["Home", "Login", "Sign up"];

  return (
    <NavbarWrapper>
      <ListWrapper>
        <ListElement>
          <StyledLink to="/">{items[0]}</StyledLink>
        </ListElement>
        <ListElement>
          <StyledLink to="/login">{items[1]}</StyledLink>
        </ListElement>
        <ListElement>
          <StyledLink to="/signup">{items[2]}</StyledLink>
        </ListElement>
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

const StyledLink  = styled(Link)`
  text-decoration: none;
  color: #eee;
`;

export default Navbar;
