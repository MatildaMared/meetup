import React from "react";
import SignupForm from "../../components/signupForm/SignupForm";
import styled from "styled-components";

function SignupPage() {
  return (
    <Wrapper>
      <SignupForm />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  padding-top: 100px;
`;

export default SignupPage;
