import React from "react";
import styled from "styled-components";

function Chat({ user, text, setTexts, textsWith }) {
  const isTextFromLoggedInUser = text.textsWith === user._id;
  return (
    <>
      {isTextFromLoggedInUser ? (
        <TextDiv direction="right">
          <p>{text.text}</p>
        </TextDiv>
      ) : (
        <TextDiv direction="left">
          <p>{text.text}</p>
        </TextDiv>
      )}
    </>
  );
}

export default Chat;

const TextDiv = styled.div`
  position: absolute;
  padding: 1rem;
  border-radius: 1.5rem;
  margin-top: 8px;
  left: ${(props) => props.direction === "left" && "1rem"};
  right: ${(props) => props.direction === "right" && "1rem"};
  color: "black";
  background-color: rgba(243, 244, 246);
`;
