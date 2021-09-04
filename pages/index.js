import React from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { parseCookies } from "nookies";
import Feed from "../components/Feed";
import baseUrl from "../utils/baseUrl";
import styles from "../styles/styles.module.css";

function Home({ user, postsData, errorLoading }) {
  console.log(`no. of posts on index: ${postsData.length}`);
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header user={user} />

      <main className="flex ">
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
      </main>
    </div>
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

    return { postsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Home;
