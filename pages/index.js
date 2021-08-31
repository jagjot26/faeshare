import React from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import Feed from "../components/Feed";

function Home({ user }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header user={user} />

      <main className="flex ">
        <Sidebar user={user} />
        <Feed />
      </main>
    </div>
  );
}

export default Home;
