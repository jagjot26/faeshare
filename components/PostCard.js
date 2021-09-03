import React from "react";

function PostCard({ post, user, setPosts, setShowToastr }) {
  return (
    <div className="m-10">
      <p>{post.text}</p>
      <img src={post.picUrl} alt="post image" />
    </div>
  );
}

export default PostCard;
