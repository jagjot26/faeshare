import { props } from "bluebird";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import calculateTime from "../utils/calculateTime";
import { ThumbUpIcon } from "@heroicons/react/solid";
import {
  ChatAltIcon,
  ShareIcon,
  ThumbUpIcon as ThumbUpOutlineIcon,
} from "@heroicons/react/outline";

function PostCard({ post, user, setPosts, setShowToastr }) {
  return (
    <div
      style={{
        fontFamily: "Roboto",
      }}
      className="mb-7 bg-white flex flex-col justify-start rounded-2xl shadow-md"
    >
      <div className="p-4">
        <div className="flex space-x-3 items-center ml-2">
          <Image src={user.profilePicUrl} />
          <div>
            <p
              style={{
                marginBottom: "-.2rem",
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "1.1rem",
              }}
            >
              {user.name}
            </p>
            <p
              style={{
                fontSize: ".9rem",
              }}
              className="text-gray-500 font-light"
            >
              {calculateTime(post.createdAt)}
            </p>
          </div>
        </div>
        <p className="ml-2 mt-5">{post.text}</p>
      </div>

      {post.picUrl && <PostImage src={post.picUrl} />}

      <div style={{ marginTop: "0.65rem" }} className="ml-5 mr-5">
        <div className="flex justify-between w-full">
          <div className="flex items-center space-x-0.5 cursor-pointer hover:underline">
            <ThumbUpIcon
              className="h-4 text-gray-400
            "
            />
            <p className="text-md text-gray-500 font-light">
              {post.likes.length}
            </p>
          </div>
          <p className="text-gray-500 cursor-pointer hover:underline font-light">{`${post.comments.length}   comments`}</p>
        </div>
      </div>

      <span
        style={{
          height: ".65px",
          backgroundColor: "lightgrey",
          margin: ".8rem auto 0 auto",
          display: "block",
          width: "94%",
        }}
      ></span>

      <div className="flex space-x-4 mt-2 ml-4 mr-4 justify-evenly items-center text-gray-500">
        <div className="flex flex-grow justify-center hover:bg-gray-100 space-x-2 mb-2 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer">
          <ThumbUpOutlineIcon className="h-6" />
          <p>Like</p>
        </div>
        <div className="flex flex-grow justify-center hover:bg-gray-100 space-x-2 mb-2 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer">
          <ChatAltIcon className="h-6" />
          <p>Comment</p>
        </div>
        <div className="flex flex-grow justify-center hover:bg-gray-100 space-x-2 mb-2 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer">
          <ShareIcon className="h-6" />
          <p>Share</p>
        </div>
      </div>
    </div>
  );
}

export default PostCard;

const Image = styled.img`
  object-fit: cover;
  height: 2.95rem;
  width: 2.95rem;
  border-radius: 50%;
`;

const PostImage = styled.img`
  object-fit: contain;
  height: auto;
  width: 100%;
  margin-top: 0.35rem;
  margin-bottom: 1.2rem;
  transition: all 0.22s ease-out;
  border-top: 0.7px solid lightgrey;
  border-bottom: 0.7px solid lightgrey;
`;
