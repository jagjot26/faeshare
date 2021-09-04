import React from "react";
import styled from "styled-components";
import calculateTime from "../utils/calculateTime";

function CommentComponent({ comment, postId, user, setComments }) {
  return (
    <div className="flex items-start pl-5 pr-5 mt-3">
      <Image
        src={comment.user.profilePicUrl}
        style={{ height: "2.45rem", width: "2.45rem", marginTop: ".2rem" }}
        className="mr-2"
      />
      <div
        style={{ padding: ".45rem 1rem" }}
        className={`bg-gray-100 rounded-3xl items-center`}
      >
        <p style={{ fontWeight: "500", marginBottom: "-.1rem" }}>
          {comment.user.name} ·{" "}
          <styledPTag className="text-gray-500 font-light text-sm">
            {calculateTime(comment.date, true)}
          </styledPTag>
        </p>
        <p style={{ fontWeight: "400" }}>{comment.text}</p>
      </div>
    </div>
  );
}

export default CommentComponent;

const Image = styled.img`
  object-fit: cover;
  height: 2.95rem;
  width: 2.95rem;
  border-radius: 50%;
`;
