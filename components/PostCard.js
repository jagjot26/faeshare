import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import calculateTime from "../utils/calculateTime";
import { ThumbUpIcon } from "@heroicons/react/solid";
import {
  ChatAltIcon,
  MinusCircleIcon,
  ShareIcon,
  ThumbUpIcon as ThumbUpOutlineIcon,
} from "@heroicons/react/outline";
import { deletePost, likePost, postComment } from "../utils/postActions";
import CommentComponent from "./CommentComponent";
import { TextareaAutosize } from "@material-ui/core";
import { useRouter } from "next/router";
import ReusableDialog from "./ReusableDialog";
import toast, { Toaster } from "react-hot-toast";
import baseUrl from "../utils/baseUrl";

const notify = () =>
  toast.success("Post deleted successfully!", {
    position: "bottom-center",
  });

const notifyCopyLink = () =>
  toast.success("Post link copied to clipboard!", {
    position: "bottom-center",
  });

function PostCard({ post, user, setPosts, postById }) {
  const router = useRouter();
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [error, setError] = useState(null);
  const isLiked =
    likes.length > 0 &&
    likes.filter((like) => like.user === user._id).length > 0; //check if post has been liked by logged in user
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(postById ? true : false);
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);

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

  const handleLike = async () => {
    await likePost(post._id, user._id, setLikes, isLiked ? false : true);
  };

  //Dialog functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = async () => {
    await deletePost(post._id, setPosts, notify);

    handleClose();
  };
  const handleDisagree = () => {
    console.log("I do not agree.");
    handleClose();
  };

  return (
    <div
      style={{ fontFamily: "Inter" }}
      className="mb-7 bg-white flex flex-col justify-start rounded-2xl shadow-md"
    >
      <Toaster />
      <div className="p-4">
        <div className="flex space-x-3 items-center ml-2 relative">
          <Image src={post.user.profilePicUrl} alt="userimg" />
          <div>
            <UserPTag
              onClick={() => {
                router.push(`/${post.user.username}`);
              }}
            >
              {post.user.name}
            </UserPTag>
            <p
              style={{
                fontSize: ".91rem",
              }}
              className="text-gray-500 font-light"
            >
              {calculateTime(post.createdAt)}
            </p>
          </div>

          <ReusableDialog
            title={"Delete Post"}
            action={"delete"}
            item={"post"}
            open={open}
            handleClose={handleClose}
            handleAgree={handleAgree}
            handleDisagree={handleDisagree}
          />
          {post.user._id === user._id && !postById && (
            <ThreeDotsDiv
              onClick={() => {
                handleClickOpen();
              }}
              className="flex justify-center items-center absolute top-0 right-2"
            >
              <MinusCircleIcon
                style={{ height: "1.2rem", width: "1.2rem" }}
                className="text-gray-500"
              />
            </ThreeDotsDiv>
          )}
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
            <p className="text-md text-gray-500 font-light select-none">
              {likes.length}
            </p>
          </div>
          <p
            onClick={() => setShowComments((prev) => !prev)}
            className="text-gray-500 cursor-pointer hover:underline font-light select-none"
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
        <div
          onClick={() => handleLike()}
          className="flex flex-grow justify-center hover:bg-gray-100 space-x-2 mb-1 mt-1 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer "
        >
          <ThumbUpOutlineIcon
            className={`h-6 ${isLiked ? "text-transparent" : ""}`}
            style={{
              fill: `${isLiked ? "black" : "transparent"}`,
            }}
          />
          <p
            style={{
              userSelect: "none",
              color: `${isLiked ? "black" : "rgba(107, 114, 128)"}`,
            }}
          >
            {/* rgba(124,58,237) */}
            Like
          </p>
        </div>
        <div
          onClick={() => setShowComments((prev) => !prev)}
          className="flex flex-grow justify-center hover:bg-gray-100 space-x-2 mb-1 mt-1 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer"
        >
          <ChatAltIcon className="h-6" />
          <p style={{ userSelect: "none" }}>Comment</p>
        </div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(`${baseUrl}/post/${post._id}`);

            notifyCopyLink();
          }}
          className="flex flex-grow justify-center hover:bg-gray-100 space-x-2 mb-1 mt-1 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer"
        >
          <ShareIcon className="h-6" />
          <p style={{ userSelect: "none" }}>Share</p>
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
                    style={{ resize: "none", fontFamily: "Inter" }}
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

          {/* checking if we're on postIdpage. If we're, then rendering all comments, otherwise rendering only 3 */}
          {postById ? (
            <>
              {comments.length > 0 &&
                comments.map((comment) => (
                  <CommentComponent
                    key={comment._id}
                    comment={comment}
                    postId={post._id}
                    user={user}
                    setComments={setComments}
                  />
                ))}
            </>
          ) : (
            <>
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
            </>
          )}

          {!postById && comments.length > 3 && (
            <p
              onClick={() => router.push(`/post/${post._id}`)}
              className="hover:underline ml-5 mt-3 text-gray-500 cursor-pointer font-normal"
            >
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
  max-height: 455px;
  width: 100%;
  margin-top: 0.35rem;
  margin-bottom: 1.2rem;
  transition: all 0.22s ease-out;
  border-top: 0.7px solid lightgrey;
  border-bottom: 0.7px solid lightgrey;
`;

const UserPTag = styled.p`
  cursor: pointer;
  margin-bottom: -0.09rem;
  font-weight: 500;
  font-size: 1.05rem;
  :hover {
    text-decoration: underline;
  }
`;

const ThreeDotsDiv = styled.div`
  height: 2.1rem;
  width: 2.1rem;
  border-radius: 50%;
  cursor: pointer;
  padding: 0.1rem;
  font-size: 1.2rem;
  :hover {
    background-color: whitesmoke;
  }
`;
