import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

function Navbar() {
  const [isSelected, setIsSelected] = useState<string>("Home");
  const items = ["Home", "Find Meetups", "Sign in", "Sign up"];

  function addClassHandler(e: any) {
    setIsSelected(e.target.innerHTML);
  }

  return (
    <NavbarWrapper>
      <ListWrapper>
        <ListElement
          onClick={(e: object) => addClassHandler(e)}
        >
          <StyledLink to="/">{items[0]}</StyledLink>
        </ListElement>
        <ListElement
          onClick={(e: object) => addClassHandler(e)}
        >
          <StyledLink to="/meetups">{items[1]}</StyledLink>
        </ListElement>
        <ListElement
          onClick={(e: object) => addClassHandler(e)}
        >
          <StyledLink to="/signin">{items[2]}</StyledLink>
        </ListElement>
        <ListElement
          onClick={(e: object) => addClassHandler(e)}
        >
          <StyledLink to="/signup">{items[3]}</StyledLink>
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

const linkStyle = {

};

export default Navbar;
