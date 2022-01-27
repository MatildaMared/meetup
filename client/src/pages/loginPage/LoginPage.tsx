import React from "react";
import LoginForm from "./../../components/LoginForm/LoginForm";
import styled from "styled-components";
import Header from "../../components/header/Header";

function LoginPage() {
  return (
    <>
      <Header />
      <Wrapper>
        <LoginForm />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 50px;
`;

export default LoginPage;
