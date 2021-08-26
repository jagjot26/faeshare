import styles from "../styles/styles.module.css";
import React, { useState, useEffect, useRef } from "react";
import cookie from "js-cookie";
import { registerUser } from "../utils/authUser";
import { Heading, Subheading } from "../components/Headings";
import { Input, Password, PasswordInput } from "../components/Inputs";
import AddUserInfo from "../components/AddUserInfo";
import AddProfilePic from "../components/AddProfilePic";

function signup() {
  const [fadeProp, setFadeProp] = useState({
    fadein: styles.fadeinreally,
  });
  const arrayOfPages = [AddUserInfo, AddProfilePic];

  const [currentPage, setCurrentPage] = useState({
    index: 0,
    value: arrayOfPages[0],
  });

  useEffect(() => {}, [currentPage]);

  return (
    <>
      <button
        onClick={() => {
          if (currentPage.index !== arrayOfPages.length - 1) {
            setCurrentPage((prev) => ({
              index: prev.index + 1,
              value: arrayOfPages[prev.index + 1],
            }));
          }
        }}
      >
        Next Page
      </button>
      {currentPage.index > 0 && (
        <button
          onClick={() => {
            if (currentPage.index !== 0) {
              setCurrentPage((prev) => ({
                index: prev.index - 1,
                value: arrayOfPages[prev.index - 1],
              }));
            }
          }}
        >
          Last Page
        </button>
      )}

      <div className={fadeProp.fadein} key={+new Date()}>
        <currentPage.value />
      </div>
    </>
  );
}

export default signup;
