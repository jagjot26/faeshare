import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Heading, Subheading } from "../components/Headings";
import { CustomInput, Password, PasswordInput } from "../components/Inputs";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

function AddUserInfo({
  setUserData,
  setNextDisabled,
  errorMessage,
  setErrorMessage,
}) {
  const [visibility, setVisibility] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [username, setUsername] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false); //loading state for username when checking if username is valid
  const [usernameAvailable, setUsernameAvailable] = useState(false); //to show tick sign when username is available

  const handleChange = (e) => {
    if (errorMessage !== "") {
      setErrorMessage("");
    }
    const { name, value, files } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setUser({
      name: sessionStorage.getItem("name") || "",
      email: sessionStorage.getItem("email") || "",
      password: sessionStorage.getItem("password") || "",
    });

    setUsername(sessionStorage.getItem("username") || "");
  }, []);

  useEffect(() => {
    console.log(
      `name: ${name}, email: ${email}, password: ${password}, username: ${username}`
    );
    const isUser = Object.values({ name, email, password, username }).every(
      (item) => Boolean(item)
    );
    //Object.values is used to convert an object into an array.
    //every is used to test if all items in the array pass the test in the defined function. Also, Every returns a boolean value
    //isUser will be true only when all values in the array have some value assigned
    //Boolean(some_variable) returns true only when its assigned
    console.log("are u there");
    if (isUser) {
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
      sessionStorage.setItem("username", username);
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  });

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setFormLoading(true);

  //     let profilePicUrl;
  //     if (media !== null) {
  //       profilePicUrl = await uploadPic(media);
  //     }

  //     //in case of error
  //     if (media !== null && !profilePicUrl) {
  //       setFormLoading(false);
  //       return setErrorMsg("Error Uploading Image");
  //     }

  //     await registerUser(user, profilePicUrl, setErrorMsg, setFormLoading);
  //   };

  return (
    <>
      <Container>
        <h1
          style={{
            fontSize: "3rem",
            fontFamily: "Poppins",
            fontWeight: "600",
            marginBottom: "-0.1rem",
          }}
        >
          Sign Up for your
        </h1>
        <Heading fontSize={"2.6rem"} fontWeight={"600"}>
          FaeShare <Subheading fontSize={"1.7rem"}>of attention.</Subheading>
        </Heading>
        <CustomInput
          placeholder="Enter Name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <CustomInput
          placeholder="Enter Email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <Password bgColor={"white"} minWidth={"21rem"} marginTop={"1.6rem"}>
          <PasswordInput
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={handleChange}
            type={visibility ? "text" : "password"}
            required
          />
          <div
            onClick={() => setVisibility((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            {visibility ? <Visibility /> : <VisibilityOff />}
          </div>
        </Password>

        <Username bgColor={"white"} minWidth={"21rem"}>
          <UsernameInput
            placeholder="Enter Username"
            name="username"
            value={username}
            onChange={(e) => {
              if (errorMessage !== "") {
                setErrorMessage("");
              }
              setUsername(e.target.value);
            }}
            required
          />
        </Username>
        {errorMessage !== "" && (
          <ErrorContainer>
            <div>
              <ErrorOutlineIcon
                style={{
                  fontSize: "1.31rem",
                  color: "#fe6f8a",
                }}
              />
            </div>

            <ErrorText>{errorMessage}</ErrorText>
          </ErrorContainer>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  background-color: whitesmoke;
`;

const Username = styled.div`
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : "transparent"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  padding: 18px;
  margin: 2.2rem 2.2rem 0 2.2rem;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "2.2rem")};
  min-width: ${(props) => (props.minWidth ? props.minWidth : "14rem")};
  max-width: 40rem;
  border: 1.5px solid #f0e6ff;
  :focus-within {
    border: 1.5px solid #a097ea;
  }
`;

const UsernameInput = styled.input`
  font-size: 1.18rem;
  font-weight: 400;
  width: 100%;
  outline: none;
  border: none;
  color: black;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #8f85de;
    opacity: 0.46; /* Firefox */
  }
`;

const ErrorText = styled.p`
  color: #fe6f8a;
  font-size: 1.01rem;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  width: 100%;
  margin-left: 0.4rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  margin-top: 2.1rem;
  align-items: center;
`;

export default AddUserInfo;
