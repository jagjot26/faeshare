import React from "react";
import { logoutUser } from "../utils/authUser";
import styled from "styled-components";

function Home({ user }) {
  return (
    <>
      <div onClick={() => logoutUser(user.email)}>LOGOUT USER</div>
    </>
  );
}

export default Home;
