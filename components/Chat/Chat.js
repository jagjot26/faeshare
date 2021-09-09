import React from "react";
import styled from "styled-components";

function Chat({ user, text, setTexts, textsWith }) {
  const isTextFromLoggedInUser = text.sender === user._id;
  return (
    <>
      {isTextFromLoggedInUser ? (
        <TextDiv direction="left">
          <p>{text.text}</p>
        </TextDiv>
      ) : (
        <TextDiv direction="right">
          <p>{text.text}</p>
        </TextDiv>
      )}
    </>
  );
}

export default Chat;

const TextDiv = styled.div`
  padding: 1rem;
  border-radius: 1.5rem;
  margin-bottom: 11px;
  margin-left: ${(props) => props.direction === "left" && "auto"};
  margin-right: ${(props) => props.direction === "right" && "auto"};
  width: fit-content;
  max-width: 18rem;

  color: "black";
  background-color: rgba(243, 244, 246);
`;
