import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  CameraIcon,
  CheckCircleIcon,
  UserAddIcon,
} from "@heroicons/react/solid";
import uploadPic from "../utils/uploadPic";
import {
  followUser,
  unfollowUser,
  profilePicturesUpdate,
} from "../utils/profileActions";
import Loader from "react-loader-spinner";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import ProfileFields from "../components/ProfileComponents/ProfileFields";
import FollowingUsers from "../components/ProfileComponents/FollowingUsers";
import FollowerUsers from "../components/ProfileComponents/FollowerUsers";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import PostCard from "../components/PostCard";
import InfoBox from "../components/HelperComponents/InfoBox";
import { EmojiSadIcon } from "@heroicons/react/outline";
import { Facebook as FacebookLoader } from "react-content-loader";
// https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260
// https://images.pexels.com/photos/552789/pexels-photo-552789.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260

function ProfilePage({
  user,
  userFollowStats,
  profile,
  followersLength,
  followingLength,
  errorLoading,
}) {
  const didMountRef = useRef(false);
  const isMountRef = useRef(false);
  const coverImageRef = useRef(null);
  const profilePicRef = useRef(null);
  const [coverPic, setCoverPic] = useState(null);
  const [coverPicPreview, setCoverPicPreview] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loadingCoverPic, setLoadingCoverPic] = useState(false);
  const [loadingProfilePic, setLoadingProfilePic] = useState(false);
  const isUserOnOwnAccount = profile.user._id === user._id;

  //state for rendering posts
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  //state for follow stats
  const [loggedUserFollowStats, setUserFollowStats] = useState(userFollowStats);
  const [loadingFollowStats, setLoadingFollowStats] = useState(false);

  const isLoggedInUserFollowing =
    loggedUserFollowStats.following.length > 0 &&
    loggedUserFollowStats.following.filter(
      (following) => following.user === profile.user._id
    ).length > 0;

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
    if (!didMountRef.current || profilePicPreview === null) {
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
    if (coverPic === null || !isMountRef.current) {
      isMountRef.current = true;
      return;
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

  //   const { username, pageNumber } = router.query;
  //for future reference, url will look like localhost:3000/jane?pageNumber=22 if we use multiple queries, (which i havent here)
  /* router.query.username is the username in [username].js */
  //for chaining multiple queries
  useEffect(() => {
    const getPosts = async () => {
      setLoadingPosts(true);

      try {
        const { username } = router.query;
        const token = cookie.get("token");

        const res = await axios.get(
          `${baseUrl}/api/profile/posts/${username}`,
          {
            headers: { Authorization: token },
          }
        );

        setPosts(res.data);
      } catch (error) {
        console.log(error);
        alert("Error Loading Posts");
      }

      setLoadingPosts(false);
    };

    getPosts();
  }, [router.query.username]); //only once on the first component render
  //this should run whenever the username changes to get the posts of that user

  return (
    <>
      <Header user={user} />
      <div
        className={` ${
          !isUserOnOwnAccount ? "min-h-[32.4rem]" : "min-h-[29.3rem]"
        }  shadow-lg`}
        style={{ fontFamily: "Inter", backgroundColor: "white" }}
      >
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
              <CoverImage src={profile.user.coverPicUrl} alt="cover pic" />
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
              <ProfileImage src={profile.user.profilePicUrl} alt="profilepic" />
            )}

            <Name className="font-semibold text-3xl">{profile.user.name}</Name>
            {/* <Username className="text-xl font-normal text-gray-600">{`@${profile.user.username}`}</Username> */}

            {!isUserOnOwnAccount &&
              (isLoggedInUserFollowing ? (
                <FollowButton
                  onClick={async () => {
                    await unfollowUser(
                      profile.user._id,
                      setUserFollowStats,
                      setLoadingFollowStats
                    );
                  }}
                >
                  <CheckCircleIcon className="h-6" />
                  <p className="ml-1.5">Following</p>
                </FollowButton>
              ) : (
                <FollowButton
                  onClick={async () => {
                    await followUser(
                      profile.user._id,
                      setUserFollowStats,
                      setLoadingFollowStats
                    );
                  }}
                >
                  <UserAddIcon className="h-6" />
                  <p className="ml-1.5">Follow</p>
                </FollowButton>
              ))}

            {isUserOnOwnAccount && (
              <>
                <CameraIconDiv onClick={() => profilePicRef.current.click()}>
                  {loadingProfilePic ? (
                    <>
                      <Loader
                        type="Puff"
                        color="black"
                        height={20}
                        width={20}
                      />
                    </>
                  ) : (
                    <CameraIcon className="h-7 text-purple-600" />
                  )}
                </CameraIconDiv>
                <EditCoverPicDiv onClick={() => coverImageRef.current.click()}>
                  {loadingCoverPic ? (
                    <>
                      <Loader
                        type="Puff"
                        color="black"
                        height={20}
                        width={20}
                      />
                    </>
                  ) : (
                    <CameraIcon className="h-7 text-gray-600" />
                  )}
                </EditCoverPicDiv>{" "}
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className="bg-gray-100 w-full"
        style={{ marginTop: ".18rem", minHeight: "calc(100vh - 26rem)" }}
      >
        <div className=" md:flex space-x-4 mx-auto max-w-[30rem] sm:max-w-xl md:max-w-3xl lg:max-w-[1000px]">
          <div
            className="max-w-[28rem] ml-4 static mt-3 md:sticky md:mt-6 flex-1 md:max-w-[27rem]"
            style={{
              // position: "-webkit-sticky" /* for Safari */,
              // position: "sticky",
              top: "6rem",
              alignSelf: "flex-start",
            }}
          >
            {loadingPosts ? (
              <FacebookLoader />
            ) : (
              <>
                <ProfileFields
                  profile={profile}
                  isUserOnOwnAccount={isUserOnOwnAccount}
                />

                {loadingFollowStats ? (
                  <FacebookLoader />
                ) : (
                  <FollowingUsers
                    profile={profile}
                    userFollowStats={userFollowStats}
                    user={user}
                  />
                )}
                {loadingFollowStats ? (
                  <FacebookLoader />
                ) : (
                  <FollowerUsers
                    profile={profile}
                    userFollowStats={userFollowStats}
                    user={user}
                  />
                )}

                <div className="h-9"></div>
              </>
            )}
          </div>
          <div className="flex-1 flex-grow mt-6 max-w-md md:max-w-lg lg:max-w-2xl ">
            {loadingPosts ? (
              <FacebookLoader />
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  user={user}
                  setPosts={setPosts}
                />
              ))
            ) : (
              <InfoBox
                marginTop={1}
                Icon={EmojiSadIcon}
                message={
                  isUserOnOwnAccount
                    ? `You don't have any posts, ${profile.user.name}.`
                    : "No posts"
                }
                content={
                  isUserOnOwnAccount
                    ? `Create a new post to start seeing posts here and get your faeshare of attention.`
                    : "This user hasn't made a single post. It looks like they are only interested in viewing other posts and lurking around."
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

ProfilePage.getInitialProps = async (ctx) => {
  try {
    const { username } = ctx.query;
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/profile/${username}`, {
      headers: { Authorization: token },
    });

    const { profile, followersLength, followingLength } = res.data;

    return { profile, followersLength, followingLength };
  } catch (error) {
    return { errorLoading: true };
  }
};

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
  border: 0.4rem solid #f7f5ff;
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

const Name = styled.p`
  position: absolute;
  top: 135%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: inherit;
`;

const Username = styled.p`
  position: absolute;
  top: 144%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FollowButton = styled.div`
  display: flex;
  position: absolute;
  cursor: pointer;
  top: 151%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.45rem 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(139, 92, 246);
  color: white;
  font-size: 1.1rem;
`;
