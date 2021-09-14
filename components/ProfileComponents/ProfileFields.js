import React, { useState } from "react";
import styled from "styled-components";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { ArrowSmRightIcon, PencilAltIcon } from "@heroicons/react/solid";
import { profileUpdate } from "../../utils/profileActions";
import Loader from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const notifyError = () =>
  toast.error("Please enter a bio.", {
    position: "bottom-center",
  });

function ProfileFields({ profile, isUserOnOwnAccount, newComp }) {
  const [bio, setBio] = useState(profile.bio ? profile.bio : "");
  const [social, setSocial] = useState({
    youtube:
      profile.social && profile.social.youtube ? profile.social.youtube : "",
    twitter:
      profile.social && profile.social.twitter ? profile.social.twitter : "",
    instagram:
      profile.social && profile.social.instagram
        ? profile.social.instagram
        : "",
    facebook:
      profile.social && profile.social.facebook ? profile.social.facebook : "",
  });
  const [editProfile, setEditProfile] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { youtube, twitter, instagram, facebook } = social;

  console.log(facebook);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "bio") {
      setBio(value);
      return;
    }
    setSocial((prev) => ({ ...prev, [name]: value }));
  };

  const updateProfile = async (e) => {
    if (bio === "") {
      notifyError();
      return;
    }
    setLoading(true);
    await profileUpdate({ ...social, bio }, setLoading, setError, null);
  };

  return (
    <div
      style={{ fontFamily: "Inter", position: "relative" }}
      className="bg-white justify-start rounded-2xl shadow-md p-5"
    >
      {editProfile ? (
        <div className="flex justify-between ml-1 mr-0.5 mb-1">
          <h1
            className="text-2xl font-semibold"
            style={{ fontFamily: "inherit" }}
          >
            Intro
          </h1>
          <Toaster />
          {loading ? (
            <Loader
              type="Puff"
              color="black"
              height={20}
              width={20}
              timeout={5000} //3 secs
            />
          ) : (
            <ArrowSmRightIcon
              onClick={updateProfile}
              className="h-7 w-7 cursor-pointer mb-5"
            />
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h1
              className="text-2xl font-semibold mb-1"
              style={{ fontFamily: "inherit" }}
            >
              Intro
            </h1>
            {isUserOnOwnAccount && (
              <PencilAltIcon
                onClick={() => setEditProfile(true)}
                className="h-6 w-6 cursor-pointer"
              />
            )}
          </div>
        </>
      )}
      {editProfile ? (
        <Container>
          <Bio
            name="bio"
            value={bio}
            onChange={handleChange}
            placeholder="Enter Bio"
            rows="2"
            wrap="soft"
          />
          <div>
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
        </Container>
      ) : (
        <>
          {bio !== "" ? (
            <div>
              <p>{bio}</p>
            </div>
          ) : (
            isUserOnOwnAccount && (
              <AddDiv onClick={() => setEditProfile(true)}>Add Bio</AddDiv>
            )
          )}
          {social.youtube === "" &&
          social.facebook === "" &&
          social.twitter === "" &&
          social.instagram === "" ? (
            isUserOnOwnAccount && (
              <AddDiv onClick={() => setEditProfile(true)}>
                Add Social Media Links
              </AddDiv>
            )
          ) : (
            <div className="mt-5">
              {social.youtube !== "" && (
                <AnchorTag
                  target="_blank"
                  href={`https://${social.youtube}`}
                  rel="noopener noreferrer"
                >
                  <SocialMediaDisplayDiv>
                    <YouTubeIcon style={{ color: "#8f85de" }} />{" "}
                    <p>{social.youtube}</p>
                  </SocialMediaDisplayDiv>
                </AnchorTag>
              )}
              {social.twitter !== "" && (
                <AnchorTag
                  target="_blank"
                  href={`https://${social.twitter}`}
                  rel="noopener noreferrer"
                >
                  <SocialMediaDisplayDiv>
                    <TwitterIcon style={{ color: "#8f85de" }} />
                    <p>{social.twitter}</p>
                  </SocialMediaDisplayDiv>
                </AnchorTag>
              )}
              {social.facebook !== "" && (
                <AnchorTag
                  target="_blank"
                  href={`https://${social.facebook}`}
                  rel="noopener noreferrer"
                >
                  <SocialMediaDisplayDiv>
                    <FacebookIcon style={{ color: "#8f85de" }} />
                    <p>{social.facebook}</p>
                  </SocialMediaDisplayDiv>
                </AnchorTag>
              )}
              {social.instagram !== "" && (
                <AnchorTag
                  target="_blank"
                  href={`https://${social.instagram}`}
                  rel="noopener noreferrer"
                >
                  <SocialMediaDisplayDiv>
                    <InstagramIcon style={{ color: "#8f85de" }} />
                    <p>{social.instagram}</p>
                  </SocialMediaDisplayDiv>
                </AnchorTag>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProfileFields;

const AddDiv = styled.div`
  cursor: pointer;
  padding: 0.65rem;
  margin-top: 1rem;
  background-color: #efeeef;
  border-radius: 0.4rem;
  :hover {
    background-color: #e2e2e2;
  }
  font-weight: 500;
`;

const Container = styled.div``;

const Bio = styled.textarea`
  overflow: hidden;
  resize: none;
  outline: none;
  padding: 15px;
  margin: 0 0;
  border: 1.5px solid #f0e6ff;
  width: 100%;
  color: black;
  border-radius: 10px;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #8f85de;
    opacity: 0.46; /* Firefox */
  }
`;

const SocialMedia = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 1rem;
  margin: 1.5rem 0 0 0;
  border: 1.5px solid #f0e6ff;
`;

const SocialMediaInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  color: black;
  margin-left: 0.75rem;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #8f85de;
    opacity: 0.46; /* Firefox */
  }
`;

const SocialMediaDisplayDiv = styled.div`
  display: flex;
  column-gap: 0.4rem;
  margin-top: 0.7rem;
  padding: 0.5rem;
  padding: 0.65rem;
  background-color: #efeeef;
  border-radius: 0.4rem;
  cursor: pointer;
  :hover {
    background-color: #e2e2e2;
  }
  user-select: none;
`;

const AnchorTag = styled.a`
  color: black;
  text-decoration: none;
  :hover {
    color: black;
  }
`;
