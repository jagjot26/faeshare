import React from "react";
import styled from "styled-components";
import { LogoutIcon, CogIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { logoutUser } from "../utils/authUser";

function Dropdown({ user }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "4rem",
        right: "1rem",
        height: "15rem",
        width: "15rem",
        backgroundColor: "lightgray",
        zIndex: "100",
        padding: "0.67rem",
        borderRadius: "0.7rem",
      }}
    >
      <div className="flex items-center hover:bg-gray-200 p-2 rounded-md  cursor-pointer">
        <div>
          <Image
            className="rounded-full mr-3"
            src={user.profilePicUrl}
            alt="user avatar"
          />
        </div>

        <div className="ml-0.5 flex flex-col">
          <p
            className="text-gray-600"
            style={{
              fontFamily: "Roboto",
              fontSize: "1.09rem",
              fontWeight: "500",
              marginBottom: "-0.19rem",
            }}
          >
            {user.name}
          </p>
          <p className="text-gray-500" style={{ fontWeight: "400" }}>
            My profile
          </p>
        </div>
      </div>
      <span
        style={{
          height: "0.65px",
          backgroundColor: "grey",
          margin: "1rem 0.8rem .7rem 0.8rem",
          display: "block",
        }}
      ></span>

      <Link href="/settings" passHref>
        <ButtonDiv>
          <Icondiv>
            <CogIcon style={{ height: "1.5rem" }} />
          </Icondiv>
          <p>Settings</p>
        </ButtonDiv>
      </Link>
      <ButtonDiv onClick={() => logoutUser(user.email)}>
        <Icondiv>
          <LogoutIcon style={{ height: "1.5rem" }} />
        </Icondiv>
        <p>Log Out</p>
      </ButtonDiv>
    </div>
  );
}

export default Dropdown;

const Image = styled.img`
  object-fit: cover;
  height: 3.3rem;
  width: 3.3rem;
`;

const ButtonDiv = styled.div`
  cursor: pointer;
  padding: 0.5rem 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  justify-content: start;
  column-gap: 0.5rem;
  align-items: center;
  :hover {
    background-color: #edf2f7;
  }
`;

const Icondiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  background-color: #dfe3ee;
`;
