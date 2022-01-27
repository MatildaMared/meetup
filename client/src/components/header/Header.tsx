import React from "react";
import meeting from "../../assets/meeting.jpg";
import styled from "styled-components";

function Header() {
  return (
    <HeaderWrapper>
      <Overlay />
      <Heading>Meetups</Heading>
      <SubHeading>When's your next meetup?</SubHeading>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  position: relative;
  height: 700px;
  background-image: url(${meeting});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1200px) {
    height: 500px;
  }

  @media (max-width: 900px) {
    height: 400px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Heading = styled.h1`
  font-size: 6rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding-top: 100px;
  z-index: 2;

  @media (max-width: 900px) {
    font-size: 4.5rem;
  }

  @media (max-width: 600px) {
    font-size: 3rem;
  }
`;

const SubHeading = styled.span`
  z-index: 2;
  font-size: 2rem;
  font-weight: 400;
  color: #fff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: rotate(-5deg);
  padding-left: 250px;

  @media (max-width: 900px) {
    font-size: 1.5rem;
    padding-left: 175px;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    padding-left: 130px;
  }
`;

export default Header;
