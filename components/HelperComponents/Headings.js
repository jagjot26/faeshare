import styled from "styled-components";

export const Heading = styled.h1`
  color: #6050dc;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "3.39rem")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "900")};
  font-family: "Poppins", sans-serif;
`;

export const Subheading = styled.p`
  text-align: center;
  color: #b19cd9;
  font-family: "Roboto", sans-serif;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.25rem")};
  max-width: 32rem;
`;
