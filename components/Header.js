import React, { useState } from "react";

import {
  SearchIcon,
  HomeIcon,
  UsersIcon,
  BellIcon,
  ChatAltIcon,
  CogIcon,
} from "@heroicons/react/outline";
import {
  SearchIcon as SearchIconSolid,
  HomeIcon as HomeIconSolid,
  UsersIcon as UsersIconSolid,
  BellIcon as BellIconSolid,
  ChatAltIcon as ChatAltIconSolid,
  CogIcon as CogIconSolid,
} from "@heroicons/react/solid";
import styled from "styled-components";
import { useRouter } from "next/router";
import HeaderIcon from "./HelperComponents/HeaderIcon";
import Link from "next/link";
import RoundedIcon from "./HelperComponents/RoundedIcon";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Dropdown from "./Dropdown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import SearchDropdown from "./SearchDropdown";

function Header({ user }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchDropdown, setShowSearchDropdown] = useState(false);
  const router = useRouter();
  const activeRoute = (path) => {
    return router.pathname === path;
  };

  return (
    <div className="flex bg-white sticky top-0 z-50 shadow-lg">
      {/* Left */}
      <div className="ml-2 sm:ml-5 p-1 flex items-center">
        <div className="hidden sm:flex items-center">
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

        <div className="flex sm:hidden items-center">
          <p
            style={{
              fontFamily: "Merienda",
              color: "#686869",
              fontWeight: "700",
              fontSize: "1.8rem",
            }}
          >
            fae
          </p>
        </div>

        <div
          onClick={() => setShowSearchDropdown(true)}
          className="flex ml-5 items-center rounded-full bg-gray-100 p-2  h-12"
        >
          <SearchIcon className="h-5 text-gray-600 px-1.5 md:px-0 cursor-pointer" />
          <input
            className="ml-2 bg-transparent outline-none placeholder-gray-500 w-full font-thin hidden md:flex md:items-center flex-shrink"
            type="text"
            placeholder="Search users"
          />
        </div>
      </div>
      {searchDropdown && (
        <SearchDropdown setShowSearchDropdown={setShowSearchDropdown} />
      )}

      {/* Mid */}
      <div className="flex justify-center flex-grow">
        <div className="flex items-center space-x-8 md:space-x-2 lg:space-x-5">
          <Link href="/" passHref>
            <div>
              <HeaderIcon
                active={activeRoute("/")}
                Icon={HomeIcon}
                IconSolid={HomeIconSolid}
              ></HeaderIcon>
            </div>
          </Link>
          <Link href={`/user/${user._id}/following`} passHref>
            <div className="hidden sm:inline-flex">
              <HeaderIcon
                active={activeRoute(`/user/${user._id}/following`)}
                Icon={UsersIcon}
                IconSolid={UsersIconSolid}
              ></HeaderIcon>
            </div>
          </Link>
          <Link href="/notifications" passHref>
            <div>
              <HeaderIcon
                active={activeRoute("/notifications")}
                Icon={BellIcon}
                IconSolid={BellIconSolid}
                unread={user.unreadNotification}
              ></HeaderIcon>
            </div>
          </Link>{" "}
          <Link href="/chats" passHref>
            <div>
              <HeaderIcon
                active={activeRoute("/chats")}
                Icon={ChatAltIcon}
                IconSolid={ChatAltIconSolid}
              ></HeaderIcon>
            </div>
          </Link>
        </div>
      </div>

      {/* Right */}
      <Link href={`/${user.username}`} passHref>
        <div className="flex items-center h-12 sm:hover:bg-gray-200 px-1 rounded-3xl m-3 cursor-pointer">
          <Image
            className="rounded-full mr-3 hidden sm:inline-flex"
            src={user.profilePicUrl}
            alt="user avatar"
          />
          <p
            className="hidden sm:inline-flex  text-gray-600 sm:mr-4"
            style={{
              fontFamily: "Roboto",
              fontSize: "1.05rem",
              fontWeight: "700",
            }}
          >
            {user.username}
          </p>
        </div>
      </Link>
      <Link href="/settings" passHref>
        <div className="hidden sm:flex items-center mr-3">
          <RoundedIcon
            active={activeRoute("/settings")}
            Icon={CogIcon}
          ></RoundedIcon>
        </div>
      </Link>
      <ClickAwayListener
        onClickAway={() => {
          setShowDropdown(false);
        }}
      >
        <div
          className="flex items-center mr-5"
          onClick={() => {
            setShowDropdown((prev) => !prev);
          }}
        >
          <RoundedIcon
            stayVisible={true}
            padding={"px-0.5"}
            Icon={ArrowDropDownIcon}
          ></RoundedIcon>
        </div>
      </ClickAwayListener>
      {showDropdown ? <Dropdown user={user} /> : <></>}
    </div>
  );
}

export default Header;

const Image = styled.img`
  object-fit: cover;
  height: 2.7rem;
  width: 2.7rem;
`;
