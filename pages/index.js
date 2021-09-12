import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { parseCookies } from "nookies";
import Feed from "../components/Feed";
import baseUrl from "../utils/baseUrl";
import styles from "../styles/styles.module.css";
import RightSideColumn from "../components/RightSideColumn";

function Home({ user, userFollowStats, postsData, chatsData, errorLoading }) {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Header user={user} />

        <main className="flex">
          <Sidebar user={user} />
          <Feed
            user={user}
            postsData={postsData}
            errorLoading={errorLoading}
            increaseSizeAnim={{
              sizeIncDown: styles.increasesizereally,
              sizeIncUp: styles.sizeup,
            }}
          />
          <RightSideColumn
            chatsData={chatsData}
            userFollowStats={userFollowStats}
            user={user}
          />
        </main>
      </div>
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/posts`, {
      headers: { Authorization: token },
      params: { pageNumber: 1 },
      // pageNumber set to 1
    });

    const chatRes = await axios.get(`${baseUrl}/api/chats`, {
      headers: { Authorization: token },
    });

    return { postsData: res.data, chatsData: chatRes.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Home;
