import { props } from "bluebird";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import calculateTime from "../utils/calculateTime";
import { ThumbUpIcon } from "@heroicons/react/solid";
import {
  ChatAltIcon,
  ShareIcon,
  ThumbUpIcon as ThumbUpOutlineIcon,
} from "@heroicons/react/outline";
import { postComment } from "../utils/postActions";
import CommentComponent from "./CommentComponent";
import { TextareaAutosize } from "@material-ui/core";

function PostCard({ post, user, setPosts, setShowToastr }) {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [error, setError] = useState(null);
  const isLiked =
    likes.length > 0 &&
    likes.filter((like) => like.user === user._id).length > 0; //check if post has been liked by logged in user
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);

  const createComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    await postComment(post._id, user, commentText, setComments, setCommentText);
    setLoading(false);
  };

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      buttonRef.current.click();
    }
  };

  return (
    <div
      style={{ fontFamily: "Roboto" }}
      className="mb-7 bg-white flex flex-col justify-start rounded-2xl shadow-md"
    >
      <div className="p-4">
        <div className="flex space-x-3 items-center ml-2">
          <Image src={user.profilePicUrl} />
          <div>
            <p
              style={{
                marginBottom: "-.09rem",
                fontWeight: "500",
                fontSize: "1.1rem",
              }}
            >
              {user.name}
            </p>
            <p
              style={{
                fontSize: ".91rem",
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
            <p className="text-md text-gray-500 font-light">{likes.length}</p>
          </div>
          <p
            onClick={() => setShowComments((prev) => !prev)}
            className="text-gray-500 cursor-pointer hover:underline font-light"
          >{`${comments.length}   comments`}</p>
        </div>
      </div>

      <div
        style={{
          borderTop: ".65px solid lightgrey",
          borderBottom: ".65px solid lightgrey",
          marginTop: ".6rem",
        }}
        className="flex space-x-4 ml-4 mr-4 justify-evenly items-center text-gray-500"
      >
        <div className="flex flex-grow justify-center hover:bg-gray-100 space-x-2 mb-1 mt-1 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer">
          <ThumbUpOutlineIcon className="h-6" />
          <p>Like</p>
        </div>
        <div
          onClick={() => setShowComments((prev) => !prev)}
          className="flex flex-grow justify-center hover:bg-gray-100 space-x-2 mb-1 mt-1 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer"
        >
          <ChatAltIcon className="h-6" />
          <p>Comment</p>
        </div>
        <div className="flex flex-grow justify-center hover:bg-gray-100 space-x-2 mb-1 mt-1 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer">
          <ShareIcon className="h-6" />
          <p>Share</p>
        </div>
      </div>

      {showComments && (
        <div className="pb-4">
          <div className="flex items-center pt-4 pl-5 pr-5 ">
            <form className="w-full">
              {/* div which contains the profilepic and the input div */}
              <div className="flex w-full space-x-2 items-center">
                <Image
                  style={{ height: "2.45rem", width: "2.45rem" }}
                  src={user.profilePicUrl}
                  alt="profile pic"
                />
                <div
                  style={{ padding: ".85rem" }}
                  className={`flex bg-gray-100 rounded-3xl items-center w-full`}
                >
                  <TextareaAutosize
                    style={{ resize: "none" }}
                    name="commentText"
                    value={commentText}
                    onChange={(e) => {
                      setCommentText(e.target.value);
                    }}
                    className="outline-none w-full bg-transparent text-md placeholder-gray-400 font-light"
                    type="text"
                    placeholder={`Write a comment...`}
                    maxRows={"4"}
                    onKeyDown={onEnterPress}
                  ></TextareaAutosize>
                </div>
              </div>
              <button
                hidden
                type="submit"
                onClick={createComment}
                ref={buttonRef}
              ></button>
            </form>
          </div>

          {comments.length === 0 && <div className="h-4"></div>}

          {comments.length > 0 &&
            comments.map(
              (comment, i) =>
                i < 3 && (
                  <CommentComponent
                    key={comment._id}
                    comment={comment}
                    postId={post._id}
                    user={user}
                    setComments={setComments}
                  />
                )
            )}

          {comments.length > 3 && (
            <p className="hover:underline ml-5 mt-3 text-gray-500 cursor-pointer font-normal">
              View all comments
            </p>
          )}
        </div>
      )}
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
