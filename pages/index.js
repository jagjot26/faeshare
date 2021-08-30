import React from "react";
import { logoutUser } from "../utils/authUser";
import styled from "styled-components";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

function Home({ user }) {
  return (
    <>
      <div onClick={() => logoutUser(user.email)}>LOGOUT USER</div>
      <SearchIcon className="h-20" />
    </>
  );
}

export default Home;
