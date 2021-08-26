import styles from "../styles/styles.module.css";
import React, { useState, useEffect, useRef } from "react";
import cookie from "js-cookie";
import { registerUser } from "../utils/authUser";
import AddUserInfo from "../components/AddUserInfo";
import AddProfilePic from "../components/AddProfilePic";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import styled from "styled-components";

function signup() {
  const arrayOfPages = [AddUserInfo, AddProfilePic];
  const [nextDisabled, setNextDisabled] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  const [currentPage, setCurrentPage] = useState({
    index: 0,
    value: arrayOfPages[0],
  });

  return (
    <>
      <Container>
        <div className={styles.fadeinreally}>
          {currentPage.index === 0 && (
            <AddUserInfo
              setUserData={setUserData}
              setNextDisabled={setNextDisabled}
            />
          )}
          {currentPage.index === 1 && <AddProfilePic />}
        </div>
        <IconContainer className={styles.fadeinreally}>
          {currentPage.index > 0 && (
            <ChevronLeftRoundedIcon
              style={{
                fontSize: "2.6rem",
                cursor: "pointer",
              }}
              onClick={() => {
                if (currentPage.index > 0) {
                  setCurrentPage((prev) => ({
                    index: prev.index - 1,
                    value: arrayOfPages[prev.index - 1],
                  }));
                }
              }}
            />
          )}

          {currentPage.index < arrayOfPages.length - 1 && (
            <ChevronRightRoundedIcon
              style={{
                fontSize: "2.6rem",
                cursor: nextDisabled ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                if (currentPage.index !== arrayOfPages.length - 1) {
                  setCurrentPage((prev) => ({
                    index: prev.index + 1,
                    value: arrayOfPages[prev.index + 1],
                  }));
                }
              }}
            />
          )}
        </IconContainer>
      </Container>
    </>
  );
}

export default signup;

const IconContainer = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  background-color: whitesmoke;
`;
