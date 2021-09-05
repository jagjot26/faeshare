import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { CameraIcon } from "@heroicons/react/solid";
import uploadPic from "../utils/uploadPic";
import { profilePicturesUpdate } from "../utils/profileActions";
import Loader from "react-loader-spinner";
// https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260
// https://images.pexels.com/photos/552789/pexels-photo-552789.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260

function ProfilePage({ user }) {
  const didMountRef = useRef(false);
  const isMountRef = useRef(false);
  const coverImageRef = useRef(null);
  const profilePicRef = useRef(null);
  const [coverPic, setCoverPic] = useState(null);
  const [coverPicPreview, setCoverPicPreview] = useState(
    user.coverPicUrl || null
  );
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loadingCoverPic, setLoadingCoverPic] = useState(false);
  const [loadingProfilePic, setLoadingProfilePic] = useState(false);

  const addImageFromDevice = async (e, name) => {
    const { files } = e.target;
    if (name === "cover") {
      setCoverPic(files[0]); //files that we receive from e.target is automatically an array, so we don't need Array.from
      setCoverPicPreview(URL.createObjectURL(files[0]));
    } else {
      setProfilePic(files[0]); //files that we receive from e.target is automatically an array, so we don't need Array.from
      setProfilePicPreview(URL.createObjectURL(files[0]));
    }
  };

  //profilePic
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    } else {
      async function updateProfilePic() {
        let profileImageUrl;
        setLoadingProfilePic(true);
        if (profilePic !== null) {
          profileImageUrl = await uploadPic(profilePic);
          console.log(profileImageUrl);
          if (!profileImageUrl) {
            setLoadingProfilePic(false);
            console.log("cant upload");
            return setError("Error uploading image");
          }
          console.log("here now");
          await profilePicturesUpdate(
            profileImageUrl,
            null,
            setLoadingProfilePic,
            setError
          );
          setLoadingProfilePic(false);
        }
      }

      updateProfilePic();
    }
  }, [profilePic]);

  //coverPic
  useEffect(() => {
    if (!isMountRef.current) {
      isMountRef.current = true;
    } else {
      async function updateCoverPic() {
        let picUrl;
        setLoadingCoverPic(true);
        if (coverPic !== null) {
          picUrl = await uploadPic(coverPic);
          console.log(picUrl);
          if (!picUrl) {
            setLoadingCoverPic(false);
            return setError("Error uploading image");
          }
          await profilePicturesUpdate(
            null,
            picUrl,
            setLoadingCoverPic,
            setError
          );
          setLoadingCoverPic(false);
        }
      }
      updateCoverPic();
    }
  }, [coverPic]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header user={user} />

      <div className="mx-auto max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-[1000px]">
        <div style={{ position: "relative" }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => addImageFromDevice(e, "cover")}
            name="media"
            ref={coverImageRef}
            style={{ display: "none" }}
          ></input>
          {coverPicPreview !== null ? (
            <CoverImage src={coverPicPreview} alt="cover pic" />
          ) : (
            <CoverImage
              src="https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt="cover pic"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => addImageFromDevice(e, "profile")}
            name="media"
            ref={profilePicRef}
            style={{ display: "none" }}
          ></input>
          {profilePicPreview !== null ? (
            <ProfileImage src={profilePicPreview} alt="profilepic" />
          ) : (
            <ProfileImage src={user.profilePicUrl} alt="profilepic" />
          )}

          <CameraIconDiv onClick={() => profilePicRef.current.click()}>
            {loadingProfilePic ? (
              <>
                <Loader type="Puff" color="black" height={20} width={20} />
              </>
            ) : (
              <CameraIcon className="h-7 text-purple-600" />
            )}
          </CameraIconDiv>
          <EditCoverPicDiv onClick={() => coverImageRef.current.click()}>
            {loadingCoverPic ? (
              <>
                <Loader type="Puff" color="black" height={20} width={20} />
              </>
            ) : (
              <CameraIcon className="h-7 text-gray-600" />
            )}
          </EditCoverPicDiv>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

const CoverImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 20rem;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
`;

const ProfileImage = styled.img`
  object-fit: cover;
  position: absolute;
  height: 13rem;
  width: 13rem;
  border-radius: 50%;
  top: 95%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 0.4rem solid white;
`;

const CameraIconDiv = styled.div`
  padding: 0.75rem;
  cursor: pointer;
  background-color: white;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #ccc;
  position: absolute;
  top: 119%;
  left: 55.5%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
`;

const EditCoverPicDiv = styled.div`
  padding: 0.75rem;
  background-color: white;
  cursor: pointer;
  position: absolute;
  right: 1.5rem;
  bottom: 1.2rem;
  border-radius: 50%;
`;
