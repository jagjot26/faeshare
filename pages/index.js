import React from "react";
import { logoutUser } from "../utils/authUser";

function Home({ user }) {
  return <div onClick={() => logoutUser(user.email)}>home</div>;
}

export default Home;
