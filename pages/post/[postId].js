import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useRef, useState } from "react";
import InfoBox from "../../components/HelperComponents/InfoBox";
import baseUrl from "../../utils/baseUrl";
import { deletePost, likePost, postComment } from "../../utils/postActions";
import toast, { Toaster } from "react-hot-toast";
import ReusableDialog from "../../components/ReusableDialog";
import styled from "styled-components";
import calculateTime from "../../utils/calculateTime";
import { ThumbUpIcon } from "@heroicons/react/solid";
import {
  ChatAltIcon,
  MinusCircleIcon,
  ShareIcon,
  ThumbUpIcon as ThumbUpOutlineIcon,
} from "@heroicons/react/outline";
import CommentComponent from "../../components/CommentComponent";
import { TextareaAutosize } from "@material-ui/core";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import PostCard from "../../components/PostCard";

function PostPageById({ post, errorLoading, user }) {
  if (errorLoading) {
    return (
      <InfoBox
        Icon={ExclamationCircleIcon}
        message={"Sorry, no post found."}
        content={"No post was found with the specified post ID."}
      />
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header user={user} />

      <main className="flex ">
        <Sidebar user={user} />
        <div className="flex-grow h-full pt-6 mr-5 xl:mr-40 ml-20 md:ml-0 md:mr-0  scrollbar-hide">
          <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
            <PostCard key={post._id} post={post} user={user} postById={true} />
          </div>
        </div>
      </main>
    </div>
  );
}

PostPageById.getInitialProps = async (ctx) => {
  try {
    const { postId } = ctx.query;
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/api/posts/${postId}`, {
      headers: { Authorization: token },
    });

    return { post: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default PostPageById;

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
