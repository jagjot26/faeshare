import React from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import Feed from "../components/Feed";

function Home({ user }) {
  return (
    <>
      <Header user={user} />

      <main>
        <Sidebar />
        <Feed />
      </main>
    </>
  );
}

export default Home;
