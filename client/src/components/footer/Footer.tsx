import React from 'react';
import styled from "styled-components/macro";

function Footer() {
  return <FooterWrapper>
      <p>Made with love by Matilda, Sofia & Sara</p> 
  </FooterWrapper>;
}


const FooterWrapper = styled.footer`
  background: #454545;  
  color: #eee;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Footer;
