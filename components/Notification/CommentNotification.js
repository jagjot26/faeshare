import React from "react";
import styled from "styled-components";
import calculateTime from "../../utils/calculateTime";
import Link from "next/link";

function CommentNotification({ notification }) {
  return (
    notification.type === "newComment" && (
      <NotificationDiv>
        <UserImage src={notification.user.profilePicUrl} alt="userimg" />
        <div className="select-none">
          <p>
            <Link href={`/${notification.user.username}`} passHref>
              {notification.user.name}
            </Link>{" "}
            commented on your{" "}
            <Link href={`/post/${notification.post._id}`} passHref>
              post
            </Link>
            .
          </p>
          <p className="text-gray-500" style={{ marginTop: "-.7rem" }}>
            {calculateTime(notification.date, true)}
          </p>
        </div>

        {/* {notification.post.picUrl} */}
      </NotificationDiv>
    )
  );
}

export default CommentNotification;

const UserImage = styled.img`
  height: 3.8rem;
  width: 3.8rem;
  border-radius: 50%;
  object-fit: cover;
`;

const NotificationDiv = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 0.3rem;
  border-bottom: 1px solid #efefef;
  font-family: Inter;
  padding: 0.6rem;
  align-items: center;
  column-gap: 0.6rem;
  :hover {
    background-color: rgba(243, 244, 246);
  }
`;
