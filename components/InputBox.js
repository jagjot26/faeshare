import React from "react";
import styled from "styled-components";
import { VideoCameraIcon } from "@heroicons/react/solid";
import { CameraIcon } from "@heroicons/react/solid";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import CreatePostIconDiv from "./CreatePostIconDiv";

function InputBox({ user }) {
  return (
    <div
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      }}
      className="bg-white rounded-2xl mt-3"
    >
      <div className="flex space-x-4 items-center p-6">
        <Image src={user.profilePicUrl} alt="profile pic" />
        <form className="w-full">
          <input
            className="outline-none w-full bg-gray-100 rounded-full p-3.5 font-light text-md placeholder-gray-400 text-lg"
            type="text"
            placeholder={`What's on your mind, ${user.name}?`}
          />
        </form>
      </div>

      <span
        style={{
          height: ".65px",
          backgroundColor: "lightgrey",
          margin: ".1rem 1.1rem 0 1.1rem",
          display: "block",
        }}
      ></span>

      <div
        className="flex space-x-4 mt-2 ml-4 mr-4"
        style={{ justifyContent: "space-evenly" }}
      >
        <CreatePostIconDiv Icon={CameraIcon} text={"Photo"} />
        <CreatePostIconDiv Icon={ArrowSmRightIcon} text={"Post"} />
      </div>
    </div>
  );
}

export default InputBox;

const Image = styled.img`
  object-fit: cover;
  height: 2.95rem;
  width: 2.95rem;
  border-radius: 50%;
`;
