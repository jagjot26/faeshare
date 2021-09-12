import axios from "axios";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import InfoBox from "../components/HelperComponents/InfoBox";
import Sidebar from "../components/Sidebar";
import baseUrl from "../utils/baseUrl";
import LikeNotification from "../components/Notification/LikeNotification";
import CommentNotification from "../components/Notification/CommentNotification";
import FollowNotification from "../components/Notification/FollowNotification";
import cookie from "js-cookie";

function Notifications({ user, notifications, errorLoading, userFollowStats }) {
  //for setting notifications to read on cleanup of the component / before re-render
  useEffect(() => {
    const notificationRead = async () => {
      try {
        await axios.post(
          `${baseUrl}/api/notifications`,
          {},
          {
            headers: { Authorization: cookie.get("token") },
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    notificationRead();
  }, []);

  if (errorLoading) {
    return (
      <InfoBox
        Icon={ExclamationCircleIcon}
        message={"Oops, an error occured"}
        content={`There was an error while fetching the notifications.`}
      />
    );
  }

  return (
    <div className="bg-gray-100">
      <Header user={user} />

      <main
        className="flex"
        style={{ height: "calc(100vh - 4.5rem)", overflowY: "auto" }}
      >
        <Sidebar user={user} />
        <div className="flex-grow mx-auto max-w-md md:max-w-lg lg:max-w-2xl bg-white p-4 shadow-lg rounded-lg overflow-y-auto">
          <div className="flex items-center ml-2">
            <Title>Notifications ·</Title>
            <NotificationCount className="text-gray-500 ml-2">
              {notifications.length}
            </NotificationCount>
          </div>

          {notifications.length > 0 ? (
            <div style={{ borderTop: "1px solid #efefef" }}>
              {notifications.map((notification) => (
                <div key={notification._id}>
                  {notification.type === "newLike" &&
                    notification.post !== null && (
                      <LikeNotification notification={notification} />
                    )}
                  {notification.type === "newComment" &&
                    notification.post !== null && (
                      <CommentNotification notification={notification} />
                    )}
                  {notification.type === "newFollower" &&
                    notification.post !== null && (
                      <FollowNotification
                        notification={notification}
                        userFollowStats={userFollowStats}
                      />
                    )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-md text-gray-500">
              {`You don't have any notifications, ${user.name}.`}
            </p>
          )}
        </div>
        <div className="bg-transparent flex-grow max-w-[290px]"></div>
      </main>
    </div>
  );
}

Notifications.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/api/notifications`, {
      headers: { Authorization: token },
    });
    return { notifications: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Notifications;

const Title = styled.p`
  user-select: none;
  font-size: 1.65rem;
  font-weight: 600;
  font-family: Inter;
`;

const NotificationCount = styled.p`
  font-family: Inter;
  user-select: none;
  font-size: 1.25rem;
  font-weight: 400;
  margin-top: -1.5rem;
`;
