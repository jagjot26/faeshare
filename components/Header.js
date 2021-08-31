import React from "react";
import { PlayIcon, SearchIcon } from "@heroicons/react/outline";
import {
  HomeIcon,
  UsersIcon,
  BellIcon,
  ChatAltIcon,
  CogIcon,
} from "@heroicons/react/solid";
import styled from "styled-components";
import { useRouter } from "next/router";
import HeaderIcon from "./HeaderIcon";
import Link from "next/link";
import RoundedIcon from "./RoundedIcon";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function Header({ user }) {
  const router = useRouter();

  const activeRoute = (path) => {
    console.log(router.pathname);
    return router.pathname === path;
  };

  return (
    <div className="flex bg-white sticky top-0 z-50 shadow-lg">
      {/* Left */}
      <div className="ml-2 sm:ml-5 p-1 flex items-center">
        <div className="flex items-center">
          <p
            style={{
              fontFamily: "Merienda",
              color: "#686869",
              fontWeight: "700",
              fontSize: "1.8rem",
            }}
          >
            faeshare
          </p>
        </div>
        <div className="flex ml-5 items-center rounded-full bg-gray-100 p-2  h-12">
          <SearchIcon className="h-5 text-gray-600 px-1.5 md:px-0" />
          <input
            className="ml-2 bg-transparent outline-none placeholder-gray-500 w-full font-thin hidden md:flex md:items-center flex-shrink"
            type="text"
            placeholder="Search users"
          />
        </div>
      </div>

      {/* Mid */}
      <div className="flex justify-center flex-grow">
        <div className="flex items-center space-x-8 md:space-x-2 lg:space-x-7">
          <Link href="/" passHref>
            <div>
              <HeaderIcon
                active={activeRoute("/")}
                Icon={HomeIcon}
              ></HeaderIcon>
            </div>
          </Link>
          <Link href="/following" passHref>
            <div>
              <HeaderIcon
                active={activeRoute("/following")}
                Icon={UsersIcon}
              ></HeaderIcon>
            </div>
          </Link>
          <Link href="/notifications" passHref>
            <div>
              <HeaderIcon
                active={activeRoute("/notifications")}
                Icon={BellIcon}
              ></HeaderIcon>
            </div>
          </Link>{" "}
          <Link href="/messages" passHref>
            <div>
              <HeaderIcon
                active={activeRoute("/messages")}
                Icon={ChatAltIcon}
              ></HeaderIcon>
            </div>
          </Link>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center h-12 sm:hover:bg-gray-200 px-1 rounded-3xl m-3 cursor-pointer">
        <Image
          className="rounded-full mr-3"
          src={user.profilePicUrl}
          alt="user avatar"
        />
        <p
          className="hidden sm:inline-flex  text-gray-600 sm:mr-4"
          style={{
            fontFamily: "Roboto",
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
        >
          {user.username}
        </p>
      </div>
      <Link href="/settings" passHref>
        <div className="flex items-center mr-3">
          <RoundedIcon
            active={activeRoute("/settings")}
            Icon={CogIcon}
          ></RoundedIcon>
        </div>
      </Link>

      <div className="flex items-center mr-3">
        <RoundedIcon
          padding={"px-1.5"}
          active={activeRoute("/settings")}
          Icon={ArrowDropDownIcon}
        ></RoundedIcon>
      </div>
    </div>
  );
}

export default Header;

const Image = styled.img`
  object-fit: cover;
  height: 2.7rem;
  width: 2.7rem;
`;
