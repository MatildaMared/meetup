import React from "react";
import meeting from "../../assets/meeting.jpg";
import styled from "styled-components";

function Header() {
  return (
    <HeaderWrapper>
      <img src={meeting} alt="People writing and reading at table" />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header `
  flex: 4;
`

export default Header;
