import React from "react";
import styled from "styled-components";
import Link from "next/link";
import calculateTime from "../utils/calculateTime";

function RightSideColumn({ chatsData }) {
  return (
    <ContainerDiv className="hidden md:block p-2 mt-5 max-w-[600px] lg:min-w-[200] xl:min-w-[300px]  ">
      <Title>Recent Chats</Title>
      <ChatContainerParent>
        {chatsData ? (
          chatsData.map((chat) => (
            <ChatDiv
              className="hover:bg-gray-200"
              key={chat.textsWith}
              onClick={() => router.push(`/chats?chat=${chat.textsWith}`)}
            >
              <div className="relative">
                <UserImage src={chat.profilePicUrl} alt="userimg" />
              </div>

              <div className="ml-1">
                <Name>{chat.name}</Name>
                <TextPreview>
                  {chat.lastText && chat.lastText.length > 30
                    ? `${chat.lastText.substring(0, 30)}...`
                    : chat.lastText}
                </TextPreview>
              </div>
              {chat.date && (
                <Date className="hidden xl:flex">
                  {calculateTime(chat.date)}
                </Date>
              )}
            </ChatDiv>
          ))
        ) : (
          <p>
            You don't have chats. Start a{" "}
            <Link href={`/chats`} passHref>
              chat
            </Link>{" "}
            with someone!
          </p>
        )}
      </ChatContainerParent>
    </ContainerDiv>
  );
}

//  HELLOOOOOOOOOOOOO
export default RightSideColumn;

const Title = styled.p`
  font-size: 1.2rem;
  font-family: inherit;
  font-weight: 600;
  margin-left: 0.4rem;
`;

const ContainerDiv = styled.div`
  font-family: "Inter";
  height: fit-content;
`;

const ChatContainerParent = styled.div`
  border-top: 0.5px solid lightgray;
`;

const ChatDiv = styled.div`
  overflow-y: auto;
  display: flex;
  cursor: pointer;
  border-radius: 0.2rem;
  border-bottom: 0.5px solid lightgray;
  font-family: Inter;
  padding: 0.9rem 0.8rem;
  align-items: flex-start;
  column-gap: 0.6rem;
  :hover {
  }
`;

const Name = styled.p`
  user-select: none;
  font-weight: 500;
  font-size: 1.04rem;
  font-family: Inter;
`;

const TextPreview = styled.p`
  font-family: Inter;
  margin-top: -0.95rem;
  color: grey;
  font-size: 0.9rem;
`;

const Date = styled.p`
  font-family: Inter;
  margin-left: auto;
`;

const UserImage = styled.img`
  height: 2.8rem;
  width: 2.8rem;
  border-radius: 50%;
  object-fit: cover;
`;
