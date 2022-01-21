import { useState } from "react";
import styled from "styled-components/macro";

interface Props {
  items: string[];
}

function Navbar({ items }: Props) {
  const [isSelected, setIsSelected] = useState<string>("Home");

  function addClassHandler(e: any) {
    setIsSelected(e.target.innerHTML);
  }

  return (
    <NavbarWrapper>
      <ListWrapper>
        {items.map((item) => (
          <ListElement
            key={item}
            onClick={(e: object) => addClassHandler(e)}
            className={isSelected === item ? "selected" : ""}
          >
            {item}
          </ListElement>
        ))}
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
