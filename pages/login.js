import React, { useState, useEffect, useRef } from "react";
import cookie from "js-cookie";
import { loginUser } from "../utils/authUser";
import styled from "styled-components";
import Link from "next/link";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Heading, Subheading } from "../components/HelperComponents/Headings";
import {
  Input,
  Password,
  PasswordInput,
} from "../components/HelperComponents/Inputs";
import ErrorComponent from "../components/HelperComponents/Error";
import loaderGif from "../logo/chat.gif";
import { ThreeBounce } from "better-react-spinkit";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
    //[name] refers to the name of the object property that we want to change.
  };

  useEffect(() => {
    const isUser = Object.values({ email, password }).every((item) =>
      Boolean(item)
    );
    //Object.values is used to convert an object into an array.
    //every is used to test if all items in the array pass the test in the defined function. Also, Every returns a boolean value
    //isUser will be true only when all values in the array have some value assigned
    //Boolean(some_variable) returns true only when its assigned

    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true); //basically this useEffect is called everytime a state change is triggered, i.e. a useState is called to change the vlues of name, email, password etc. Only whenn all of them have been entered is when isUser will become true and submitButton will be enabled
  }, [email, password]);

  const handleSubmit = async (e) => {
    console.log(`email: ${email}, password: ${password}`);
    await loginUser(user, setErrorMessage, setLoading);
  };

  useEffect(() => {
    const userEmail = cookie.get("userEmail");
    if (userEmail) setUser((prev) => ({ ...prev, email: userEmail }));
  }, []);

  return (
    <>
      <Container>
        <h1
          style={{
            fontSize: "2.8rem",
            fontFamily: "Poppins",
            fontWeight: "600",
            marginBottom: "-0.1rem",
          }}
        >
          Log In
        </h1>
        <Heading fontSize={"2.6rem"} fontWeight={"600"}>
          FaeShare
        </Heading>
        <Subheading fontSize={"1.48rem"}>
          Get your fair share of attention.
        </Subheading>
        <LoginBox className="h-[29.25rem] w-[29.5rem]  lg:w-[30.5rem]">
          <Input
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <Password marginTop={"1.3rem"}>
            <PasswordInput
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={handleChange}
              type={visibility ? "text" : "password"}
            />
            <div
              onClick={() => setVisibility((prev) => !prev)}
              style={{ cursor: "pointer" }}
            >
              {visibility ? <Visibility /> : <VisibilityOff />}
            </div>
          </Password>

          {errorMessage !== "" && (
            <ErrorComponent errorMessage={errorMessage} />
          )}

          <Button disabled={submitDisabled} onClick={handleSubmit}>
            {loading ? <ThreeBounce size={9} color="#fff" /> : "Log In"}
          </Button>
          <SmallButton>Forgotten Password?</SmallButton>
          <span
            style={{
              height: "1.5px",
              backgroundColor: "#f0e6ff",
              margin: "0.4rem 2.2rem 0 2.2rem",
            }}
          ></span>

          <BottomText>
            New to FaShare?{" "}
            <Link href="/signup" passHref>
              <BottomAnchor>Create an account.</BottomAnchor>
            </Link>
          </BottomText>
        </LoginBox>
      </Container>
    </>
  );
}

export default Login;

const Container = styled.div`
  padding-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);

  min-width: 24rem;
`;

const Button = styled.button`
  transition: all 0.4s;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 10px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#6050dc"};
  color: white;
  font-size: 1.39rem;
  font-family: "Poppins", sans-serif;
  margin: 2.2rem 2.2rem 1.5rem 2.2rem;
  padding: 15px;
  font-weight: 500;
  border: none;

  :hover {
    background-color: ${(props) => (props.disabled ? "#a097ea" : "#3e2fb3")};
  }
`;

const SmallButton = styled.p`
  cursor: pointer;
  text-align: center;
  color: #b19cd9;
  font-family: "Roboto", sans-serif;
  font-size: 1.25rem;
  :hover {
    text-decoration: underline;
  }
`;

const BottomText = styled.p`
  color: #b19cd9;
  font-size: 1.1rem;
  text-align: center;
  font-family: "Roboto", sans-serif;
  margin-top: 2rem;
  font-weight: 300;
`;

const BottomAnchor = styled.a`
  color: #ff8af2;
  :hover {
    cursor: pointer;
    color: #ff8af2;
    text-decoration: underline;
  }
`;
