import React, { useState } from "react";
import styled from "styled-components";
import calculateTime from "../../utils/calculateTime";
import Link from "next/link";
import { CheckCircleIcon, UserAddIcon } from "@heroicons/react/solid";
import { followUser, unfollowUser } from "../../utils/profileActions";

function FollowNotification({ notification, userFollowStats }) {
  const [loading, setLoading] = useState(false);
  const [loggedInUserFollowStats, setLoggedInUserFollowStats] =
    useState(userFollowStats);

  const isFollowing =
    loggedInUserFollowStats.following.length > 0 &&
    loggedInUserFollowStats.following.filter(
      (following) => following.user === notification.user._id
    ).length > 0;

  return (
    notification.type === "newFollower" && (
      <NotificationDiv>
        <UserImage src={notification.user.profilePicUrl} alt="userimg" />
        <div>
          <p className="select-none">
            <Link href={`/${notification.user.username}`} passHref>
              {notification.user.name}
            </Link>{" "}
            started following you.
          </p>
          <p className="text-gray-500" style={{ marginTop: "-.7rem" }}>
            {calculateTime(notification.date, true)}
          </p>
        </div>

        {isFollowing ? (
          <FollowButton
            onClick={async () => {
              await unfollowUser(
                notification.user._id,
                setLoggedInUserFollowStats,
                setLoading
              );
            }}
          >
            <CheckCircleIcon className="h-5" />
            <p className="ml-1.5">Following</p>
          </FollowButton>
        ) : (
          <FollowButton
            onClick={async () => {
              await followUser(
                notification.user._id,
                setLoggedInUserFollowStats,
                setLoading
              );
            }}
          >
            <UserAddIcon className="h-5" />
            <p className="ml-1.5">Follow back</p>
          </FollowButton>
        )}
        {/* {notification.post.picUrl} */}
      </NotificationDiv>
    )
  );
}

export default FollowNotification;

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
  /* :hover {
    background-color: rgba(243, 244, 246);
  } */
`;

const FollowButton = styled.div`
  height: fit-content;
  margin-left: 0.4rem;
  padding: 0.5rem;
  display: flex;
  cursor: pointer;
  border-radius: 0.5rem;
  /* border: 1.5px solid black; */
  background-color: transparent;
  color: rgba(107, 114, 128);
  align-self: flex-start;
  font-size: 0.95rem;
  font-family: "Inter";
  font-weight: 400;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
      rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  }
`;
