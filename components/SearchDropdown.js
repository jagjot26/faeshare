import {
  ArrowLeftIcon,
  DotsHorizontalIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import axios from "axios";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import cookie from "js-cookie";
import baseUrl from "../utils/baseUrl";
import { Facebook } from "react-content-loader";
import Link from "next/link";
// import onClickOutside from "react-onclickoutside";
import { useClickAway } from "react-use";

let cancel;

function SearchDropdown({ setShowSearchDropdown }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const { value } = e.target;
    if (value.length === 0) {
      setSearchTerm(value);
      setSearchResults([]);
      return;
    }

    setSearchTerm(value);

    setLoading(true);
    try {
      //if cancel is true that means an old request is there and cancel() will cancel that pending request
      cancel && cancel();
      const CancelToken = axios.CancelToken;
      const token = cookie.get("token");

      const res = await axios.get(`${baseUrl}/api/search/${value}`, {
        headers: { Authorization: token },
        //initialise cancel token. set canceler to 'cancel' variable
        cancelToken: new CancelToken((canceler) => {
          cancel = canceler;
        }),
      });

      if (res.data.length === 0) {
        searchResults.length > 0 && setSearchResults([]);
        return setLoading(false);
      }

      setSearchResults(res.data);
    } catch (error) {
      console.log("Error Searching");
    }

    setLoading(false);
  };

  // SearchDropdown.handleClickOutside = () => setShowSearchDropdown(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShowSearchDropdown(false);
  });

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: "0rem",
        left: "0rem",
        minHeight: "6rem",
        width: "17.9rem",
        backgroundColor: "white",
        zIndex: "100",
        padding: "0.5rem",
        borderRadius: "0.7rem",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        fontFamily: "Inter",
      }}
    >
      <div className="flex items-center">
        <ArrowDiv onClick={() => setShowSearchDropdown(false)}>
          <ArrowLeftIcon className="h-5" />
        </ArrowDiv>
        <div className="flex mr-2 ml-1 items-center rounded-full bg-gray-100 p-1 h-12 flex-grow">
          {/* <SearchIcon className="h-5 text-gray-600" /> */}
          <input
            autoFocus={true}
            className="ml-1 bg-transparent outline-none placeholder-gray-500 w-full font-thin"
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center mt-5 mb-2">
          <DotsHorizontalIcon className="h-6 text-gray-400" />
        </div>
      ) : searchResults.length > 0 ? (
        <>
          {searchResults.map((resultUser) => (
            <Link
              key={resultUser._id}
              href={`/${resultUser.username}`}
              passHref
            >
              <div
                onClick={() => setShowSearchDropdown(false)}
                className="flex items-center space-x-3 mt-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
              >
                <Image src={resultUser.profilePicUrl} alt="userimg" />
                <Name>{resultUser.name}</Name>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <div className="w-full flex items-center justify-center mt-5 mb-2">
          <p className="text-gray-400 font-thin ">Start typing...</p>
        </div>
      )}
    </div>
  );
}
// const clickOutsideConfig = {
//   handleClickOutside: () => SearchDropdown.handleClickOutside,
// };

// export default onClickOutside(SearchDropdown, clickOutsideConfig);
export default SearchDropdown;

const ArrowDiv = styled.div`
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  padding: 0.75rem;
  :hover {
    background-color: #eee;
  }
`;

const Image = styled.img`
  object-fit: cover;
  border-radius: 50%;
  height: 2.7rem;
  width: 2.7rem;
`;

const Name = styled.p`
  user-select: none;
  font-family: Inter;
  font-size: 1rem;
`;
