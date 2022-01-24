import React from "react";
import LoginForm from "./../../components/LoginForm/LoginForm";
import styled from "styled-components";

function LoginPage() {
  return (
    <Wrapper>
      <LoginForm />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;
`;

export default LoginPage;
