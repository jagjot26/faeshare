import React, { useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Heading, Subheading } from "./HelperComponents/Headings";
import {
  CustomInput,
  Input,
  SocialMedia,
  SocialMediaInput,
} from "./HelperComponents/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import ImageDiv from "./ImageDiv";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import mediaqueries from "../utils/mediaqueries";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import { Circle } from "better-react-spinkit";
import uploadPic from "../utils/uploadPic";
import { registerUser } from "../utils/authUser";
import ErrorComponent from "./HelperComponents/Error";

function AddProfilePic() {
  const inputRef = useRef();
  const user = useSelector(selectUser);
  console.log(user);

  const [optionalDetails, setOptionalDetails] = useState({
    bio: "",
    youtube: "",
    twitter: "",
    instagram: "",
    facebook: "",
  });

  const { bio, youtube, twitter, instagram, facebook } = optionalDetails;
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "media") {
      setMedia(files[0]); //files that we receive from e.target is automatically an array, so we don't need Array.from
      setMediaPreview(URL.createObjectURL(files[0]));
    } else {
      setOptionalDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitProfile = async () => {
    let profilePicUrl;
    setLoading(true);
    if (media !== null) {
      profilePicUrl = await uploadPic(media);
    }

    //in case of error
    if (media !== null && !profilePicUrl) {
      setLoading(false);
      return setErrorMessage("Error Uploading Image");
    }

    console.log({ ...user, ...optionalDetails });

    if (bio === "") {
      setLoading(false);
      return setErrorMessage("Please enter a bio");
    }

    await registerUser(
      { ...user, ...optionalDetails },
      profilePicUrl,
      setErrorMessage,
      setLoading
    );
  };

  return (
    <>
      <Container>
        <ImageDiv
          mediaPreview={mediaPreview}
          setMediaPreview={setMediaPreview}
          setMedia={setMedia}
          inputRef={inputRef}
          // highlighted={highlighted}
          // setHighlighted={setHighlighted}
          handleChange={handleChange}
        ></ImageDiv>
        <Bio
          name="bio"
          value={bio}
          onChange={handleChange}
          placeholder="Enter Bio"
          rows="3"
          wrap="soft"
        />
        <div
          style={{
            maxWidth: "37rem",
            display: "flex",

            flexWrap: "wrap",
            justifyContent: "center",
            columnGap: "2rem",
          }}
        >
          <SocialMedia>
            <YouTubeIcon style={{ color: "#8f85de" }} />
            <SocialMediaInput
              name="youtube"
              value={youtube}
              onChange={handleChange}
              placeholder="YouTube"
            />
          </SocialMedia>
          <SocialMedia>
            <TwitterIcon style={{ color: "#8f85de" }} />
            <SocialMediaInput
              name="twitter"
              value={twitter}
              onChange={handleChange}
              placeholder="Twitter"
            />
          </SocialMedia>
          <SocialMedia>
            <InstagramIcon style={{ color: "#8f85de" }} />
            <SocialMediaInput
              name="instagram"
              value={instagram}
              onChange={handleChange}
              placeholder="Instagram"
            />
          </SocialMedia>
          <SocialMedia>
            <FacebookIcon style={{ color: "#8f85de" }} />
            <SocialMediaInput
              name="facebook"
              value={facebook}
              onChange={handleChange}
              placeholder="Facebook"
            />
          </SocialMedia>
        </div>
        {/* <CreateAccountButton>Create account</CreateAccountButton> */}
        {errorMessage !== "" && <ErrorComponent errorMessage={errorMessage} />}
        <ArrowRightDiv onClick={() => submitProfile()}>
          {loading ? (
            <Circle size={22} color="white" />
          ) : (
            <ArrowForwardRoundedIcon
              style={{ color: "white", fontSize: "1.8rem" }}
            />
          )}
        </ArrowRightDiv>
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

const Bio = styled.textarea`
  overflow: hidden;
  resize: none;
  font-size: 1.18rem;
  font-weight: 400;
  outline: none;
  padding: 18px;
  margin: 3.6rem 2.2rem 0 2.2rem;
  border: 1.5px solid #f0e6ff;
  color: black;
  border-radius: 10px;
  min-width: 37rem;

  @media only screen and (max-width: 600px) {
    margin-top: 2rem;
    min-width: 20rem;
  }

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #8f85de;
    opacity: 0.46; /* Firefox */
  }

  :focus {
    border: 2px solid #a097ea;
  }
`;

const ArrowRightDiv = styled.div`
  cursor: pointer;
  height: 4rem;
  width: 4rem;
  margin-top: 3.8rem;
  background-color: #6050dc;
  border-radius: 50%;
  display: grid;
  place-items: center;
  transition: all 0.21s ease-in;

  :hover {
    background-color: #3e2fb3;
    transform: scale(1.04);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }

  @media only screen and (max-width: 320px) {
    margin-top: 1rem;
    height: 3.5rem;
    width: 3.5rem;
  }
`;

// const CreateAccountButton = styled.button`
//   transition: all 0.4s;
//   cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
//   border-radius: 10px;
//   background-color: ${(props) =>
//     props.backgroundColor ? props.backgroundColor : "#6050dc"};
//   color: white;
//   font-size: 1.5rem;
//   font-family: "Poppins", sans-serif;
//   margin: 5rem 2.2rem 1.5rem 2.2rem;
//   padding: 18px;
//   font-weight: 500;
//   border: none;

//   :hover {
//     background-color: ${(props) => (props.disabled ? "#a097ea" : "#3e2fb3")};
//   }
// `;

export default AddProfilePic;
