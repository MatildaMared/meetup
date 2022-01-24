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
          <Link to="/">{items[0]}</Link>
        </ListElement>
        {/* <ListElement
          onClick={(e: object) => addClassHandler(e)}
        >
          <StyledLink to="/meetups">{items[1]}</StyledLink>
        </ListElement> */}
        <ListElement
          onClick={(e: object) => addClassHandler(e)}
        >
          <Link to="/signin">{items[2]}</Link>
        </ListElement>
        <ListElement
          onClick={(e: object) => addClassHandler(e)}
        >
          <Link to="/signup">{items[3]}</Link>
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

// const StyledLink  = styled(Link)`
//   text-decoration: none;
//   color: #eee;
// `;

export default Navbar;
