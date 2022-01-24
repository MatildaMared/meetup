import React from "react";
import styled from "styled-components";
import CreateForm from "../../components/createForm/CreateForm";

function CreatePage() {
  return (
    <Wrapper>
      <CreateForm />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;
`;

export default CreatePage;
