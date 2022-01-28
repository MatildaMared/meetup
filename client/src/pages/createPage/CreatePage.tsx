import React from "react";
import styled from "styled-components";
import CreateForm from "../../components/createForm/CreateForm";
import Header from "../../components/header/Header";

function CreatePage() {
  return (
    <>
      <Header />
      <Wrapper>
        <CreateForm />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;
  padding-bottom: 50px;
`;

export default CreatePage;
