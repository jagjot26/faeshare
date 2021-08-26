import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Heading, Subheading } from "../components/Headings";
import { Input, Password, PasswordInput } from "../components/Inputs";

function AddProfilePic() {
  return (
    <>
      <Container>
        <h1>ProfilePic Fae</h1>
        <Heading>FaeShare</Heading>
        <Subheading>
          A place where everyone gets their fair share of attention.
        </Subheading>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  background-color: whitesmoke;
`;

export default AddProfilePic;
