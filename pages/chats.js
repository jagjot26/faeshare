import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import baseUrl from "../utils/baseUrl";
import io from "socket.io-client"; //socket.io import
import Sidebar from "../components/Sidebar";
import ChatSearch from "../components/Chat/ChatSearch";
import { SearchIcon } from "@heroicons/react/outline";
import styled from "styled-components";
import calculateTime from "../utils/calculateTime";
import Chat from "../components/Chat/Chat";

function ChatsPage({ user, chatsData }) {
  const [chats, setChats] = useState(chatsData);
  const router = useRouter();
  const socket = useRef();
  const [texts, setTexts] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [chatUserData, setChatUserData] = useState({
    name: "",
    profilePicUrl: "",
  });
  //This ref is for persisting the state of query string in the url(i.e. the chat.textsWith) throughout re-renders
  //when the component re-rendered, the query string was resetting due to a bug in next.js
  const openChatId = useRef("");
  const [showChatSearch, setShowChatSearch] = useState(false);

  //SOCKET.io useEffect (used for connection)
  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseUrl); //establishing connection with server;
    }

    if (socket.current) {
      //to send data from socket, we use emit
      socket.current.emit("join", { userId: user._id });
      //sends a connection event 'join' to the server

      //listens to the event 'connectedUsers' from the server
      socket.current.on("connectedUsers", ({ users }) => {
        users.length > 0 && setConnectedUsers(users);
      });
    }

    if (chats.length > 0 && !router.query.chat) {
      router.push(`/chats?chat=${chats[0].textsWith}`, undefined, {
        shallow: true,
      });
      //shallow is used to push a page on the router stack without refreshing
    }
  }, []);

  //LOAD TEXTS useEffect. Runs whenever router.query.chat changes, so basically whenever the user clicks on a different user
  useEffect(() => {
    const loadTexts = () => {
      socket.current.emit("loadTexts", {
        userId: user._id,
        textsWith: router.query.chat,
      });
      console.log(router.query.chat);
      socket.current.on("textsLoaded", ({ chat, textsWithDetails }) => {
        //in the case when previous chat isnt there with a user and logged in user clicks on that user from search
        if (textsWithDetails) {
          console.log(textsWithDetails.name, textsWithDetails.id);
          setTexts([]);
          setChatUserData({
            name: textsWithDetails.name,
            profilePicUrl: textsWithDetails.profilePicUrl,
          });
          openChatId.current = router.query.chat;
        } else {
          setTexts(chat.texts);

          setChatUserData({
            name: chat.textsWith.name,
            profilePicUrl: chat.textsWith.profilePicUrl,
          });
          openChatId.current = chat.textsWith._id; //insert value in router.query ref
        }
      });
    };

    if (socket.current && router.query.chat) {
      loadTexts(); //this should be in a useEffect that's below the useEffect that's creating the connection
    }
  }, [router.query.chat]);

  const sendMsg = (text) => {
    if (socket.current) {
      socket.current.emit("sendNewText", {
        userId: user._id,
        userToTextId: openChatId.current,
        text,
      });
    }
  };

  //Confirming a sent text and receiving the texts useEffect
  //socket.current.on is basically a listener that keeps listening for the event until we've moved to another page.
  //it just needs to be activated once on component mount
  useEffect(() => {
    if (socket.current) {
      socket.current.on("textSent", ({ newText }) => {
        //if we're still on the same chat
        if (newText.receiver === openChatId.current) {
          setTexts((prev) => [...prev, newText]);

          //setChats is basically used to set the data required for the left half of the column, as in the names and lastText and stuff
          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.textsWith === newText.receiver
            );
            previousChat.lastText = newText.text;
            previousChat.date = newText.date;

            return [...prev];
          });
        }
      });
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header user={user} />
      <main className="flex">
        <Sidebar user={user} />
        <div className="flex flex-grow h-screen w-full mx-auto max-w-2xl lg:mx-10 lg:max-w-[65rem] xl:max-w-[70.5rem] bg-white  rounded-lg">
          <div
            style={{
              borderLeft: "1px solid lightgrey",
              borderRight: "1px solid lightgrey",
              fontFamily: "Inter",
            }}
            className="lg:min-w-[27rem] h-screen relative pt-4"
          >
            <Title>Chats</Title>
            <div
              onClick={() => setShowChatSearch(true)}
              className="flex items-center rounded-full bg-gray-100 p-2  m-4 h-12"
            >
              <SearchIcon className="h-5 text-gray-600 px-1.5 md:px-0 cursor-pointer" />
              <input
                className="ml-2 bg-transparent outline-none placeholder-gray-500 w-full font-thin hidden md:flex md:items-center flex-shrink"
                type="text"
                placeholder="Search users"
              />
            </div>

            {showChatSearch && (
              <ChatSearch
                setShowChatSearch={setShowChatSearch}
                chats={chats}
                setChats={setChats}
              />
            )}

            <div className="mt-4" style={{ borderTop: "1px solid #efefef" }}>
              <>
                {chats.length > 0 &&
                  chats.map((chat) => (
                    <ChatDiv
                      key={chat.textsWith}
                      onClick={() =>
                        router.push(`/chats?chat=${chat.textsWith}`)
                      }
                    >
                      <UserImage src={chat.profilePicUrl} alt="userimg" />
                      <div className="ml-1">
                        <Name>{chat.name}</Name>
                        <TextPreview>
                          {chat.lastText.length > 20
                            ? chat.lastText.substring(0, 20)
                            : chat.lastText}
                        </TextPreview>
                      </div>
                      {chat.date && <Date>{calculateTime(chat.date)}</Date>}
                    </ChatDiv>
                  ))}
              </>
            </div>
          </div>
          <div
            style={{
              minWidth: "27rem",
              flex: "1",
              borderRight: "1px solid lightgrey",
              fontFamily: "Inter",
            }}
          >
            <ChatHeaderDiv>
              {/* using chatUserData here since it updates itself whenever router.query.chat changes as defined in one of the useEffects above */}

              <UserImage src={chatUserData.profilePicUrl} alt="userimg" />
              <div>
                <ChatName>{chatUserData.name}</ChatName>
                <LastActive>2:09PM</LastActive>
              </div>
            </ChatHeaderDiv>
            <div className="relative mt-2">
              {texts.length > 0 ? (
                texts.map((text, i) => (
                  <Chat
                    key={i}
                    user={user}
                    text={text}
                    setTexts={setTexts}
                    textsWith={openChatId.current}
                  />
                ))
              ) : (
                <div>No texts</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

ChatsPage.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/api/chats`, {
      headers: { Authorization: token },
    });
    return { chatsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default ChatsPage;

const Title = styled.p`
  user-select: none;
  font-size: 1.65rem;
  font-weight: 600;
  font-family: Inter;
  margin: 1rem;
`;

const UserImage = styled.img`
  height: 3.8rem;
  width: 3.8rem;
  border-radius: 50%;
  object-fit: cover;
`;

const ChatDiv = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 0.3rem;
  border-bottom: 1px solid #efefef;
  font-family: Inter;
  padding: 1rem 0.9rem;
  align-items: flex-start;
  column-gap: 0.6rem;
  :hover {
    background-color: rgba(243, 244, 246);
  }
`;

const ChatHeaderDiv = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 0.3rem;
  border-bottom: 1px solid #efefef;
  font-family: Inter;
  padding: 1rem 0.9rem;
  align-items: flex-start;
  column-gap: 0.6rem;
`;
const Name = styled.p`
  user-select: none;
  font-weight: 600;
  font-size: 1.08rem;
  font-family: Inter;
`;

const ChatName = styled.p`
  user-select: none;
  font-weight: 600;
  font-size: 1.2rem;
  font-family: Inter;
`;

const TextPreview = styled.p`
  font-family: Inter;
  margin-top: -0.95rem;
`;

const Date = styled.p`
  font-family: Inter;
  margin-left: auto;
`;

const LastActive = styled.p`
  user-select: none;
  font-size: 0.9rem;
  color: rgba(107, 114, 128);
`;
