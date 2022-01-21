import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

function Navbar() {
  const [isSelected, setIsSelected] = useState<string>("Home");
  const items = ["Home", "Find Meetups", "Sign in", "Sign up"];

  function addClassHandler(e: any) {
    setIsSelected(e.target.innerHTML);
    console.log(isSelected);
    
  }

  return (
    <NavbarWrapper>
      <ListWrapper>
        <Link
          to="/"
          onClick={(e: object) => addClassHandler(e)}
          className={isSelected === items[0] ? "selected" : ""}
        >
          {items[0]}
        </Link>
        <Link
          to="/meetups"
          onClick={(e: object) => addClassHandler(e)}
          className={isSelected === items[1] ? "selected" : ""}
        >
          {items[1]}
        </Link>
        <Link
          to="/signin"
          onClick={(e: object) => addClassHandler(e)}
          className={isSelected === items[2] ? "selected" : ""}
        >
          {items[2]}
        </Link>
        <Link
          to="/signup"
          onClick={(e: object) => addClassHandler(e)}
          className={isSelected === items[3] ? "selected" : ""}
        >
          {items[3]}
        </Link>
      </ListWrapper>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.nav`
  background: #454545;
  color: #eee;
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

export default Navbar;
