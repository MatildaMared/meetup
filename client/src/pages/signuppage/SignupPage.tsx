import React from "react";
import SignupForm from "../../components/signupForm/SignupForm";
import styled from "styled-components";
import Header from "../../components/header/Header";

function SignupPage() {
  return (
    <>
      <Header />
      <Wrapper>
        <SignupForm />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main`
  padding-top: 50px;
  padding-bottom: 50px;
`;

export default SignupPage;
