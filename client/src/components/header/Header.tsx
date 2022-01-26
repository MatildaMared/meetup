import React from "react";
import meeting from "../../assets/meeting.jpg";
import styled from "styled-components";

function Header() {
  return <Image />;
}

const Image = styled.header`
  height: 700px;
  background-image: url(${meeting});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 1200px) {
    height: 500px;
  }

  @media (max-width: 900px) {
    height: 400px;
  }
`;

export default Header;
