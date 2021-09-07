import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import baseUrl from "../../../utils/baseUrl";
import { parseCookies } from "nookies";
import InfoBox from "../../../components/HelperComponents/InfoBox";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserAddIcon,
} from "@heroicons/react/solid";
import Header from "../../../components/Header";
import styled from "styled-components";
import { followUser, unfollowUser } from "../../../utils/profileActions";

function FollowingPage({ user, userFollowStats, following, errorLoading }) {
  const router = useRouter();

  const [followingArrayState, setFollowingArrayState] = useState(following);
  const [loggedUserFollowStats, setLoggedUserFollowStats] =
    useState(userFollowStats);

  if (errorLoading) {
    return (
      <InfoBox
        Icon={ExclamationCircleIcon}
        message={"Oops, an error occured"}
        content={`There was an error while fetching the users this user has followed`}
      />
    );
  }

  return (
    <div className="bg-gray-100 h-screen">
      <Header user={user} />

      <div
        style={{ fontFamily: "Inter" }}
        className="mx-auto mt-6 max-w-md md:max-w-3xl lg:max-w-[58rem] bg-white p-4 shadow-lg rounded-lg"
      >
        <div className="flex items-center ml-2">
          <Title>Following ·</Title>
          <FollowingNumber className="text-gray-500 ml-2">
            {followingArrayState.length}
          </FollowingNumber>
        </div>
        <GridContainer>
          {followingArrayState.map((fol) => {
            const isLoggedInUserFollowing =
              loggedUserFollowStats.following.length > 0 &&
              loggedUserFollowStats.following.filter(
                (loggedInUserFollowing) =>
                  loggedInUserFollowing.user === fol.user._id
              ).length > 0;

            return (
              <div
                style={{ border: "1px solid #eee" }}
                key={fol.user._id}
                className="flex items-center justify-between p-4 mb-4 rounded-lg bg-white"
              >
                <div className="flex items-center  ">
                  <Image src={fol.user.profilePicUrl} alt="userimg" />
                  <Name
                    className="ml-3"
                    onClick={() => router.push(`/${fol.user.username}`)}
                  >
                    {fol.user.name}
                  </Name>
                </div>
                {fol.user._id !== user._id ? (
                  <>
                    {isLoggedInUserFollowing ? (
                      <FollowButton
                        onClick={async () => {
                          await unfollowUser(
                            fol.user._id,
                            setLoggedUserFollowStats
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
                            fol.user._id,
                            setLoggedUserFollowStats
                          );
                        }}
                      >
                        <UserAddIcon className="h-6 " />
                        <p className="ml-1.5">Follow</p>
                      </FollowButton>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </GridContainer>
      </div>
    </div>
  );
}

{
  /* {followingArrayState.map((fol) => (
            <div
              style={{ border: "1px solid #eee" }}
              key={fol.id}
              className="flex justify-between mb-4 rounded-lg bg-white"
            >
              <div className="flex items-center p-4 ">
                <Image src={fol.pic} />
                <Name className="ml-3">{fol.name}</Name>
              </div> */
}
{
  /* {isLoggedInUserFollowing ? (
                <FollowButton
                //   onClick={async () => {
                //     await unfollowUser(profile.user._id, setUserFollowStats);
                //   }}
                >
                  <CheckCircleIcon className="h-6" />
                  <p className="ml-1.5">Following</p>
                </FollowButton>
              ) : (
                <FollowButton
                //   onClick={async () => {
                //     await followUser(profile.user._id, setUserFollowStats);
                //   }}
                >
                  <UserAddIcon className="h-6" />
                  <p className="ml-1.5">Follow</p>
                </FollowButton>
              )} */
}

FollowingPage.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);

    const res = await axios.get(
      `${baseUrl}/api/profile/following/${ctx.query.userId}`,
      {
        headers: { Authorization: token },
      }
    );
    return { following: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default FollowingPage;

const FollowButton = styled.div`
  height: fit-content;
  padding: 0.5rem;
  display: flex;
  cursor: pointer;
  border-radius: 0.5rem;
  background-color: rgba(139, 92, 246);
  color: white;
  font-size: 1.1rem;
  font-family: "Inter";
  font-weight: 400;
  :hover {
    background-color: rgba(109, 40, 217);
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.9rem;
`;

const Image = styled.img`
  object-fit: cover;
  height: 6rem;
  width: 6rem;
  border-radius: 0.6rem;
`;

const Name = styled.p`
  cursor: pointer;
  user-select: none;
  font-weight: 500;
  font-size: 1.12rem;
  font-family: "Inter";
  :hover {
    text-decoration: underline;
  }
`;

const Title = styled.p`
  user-select: none;
  font-size: 2rem;
  font-weight: 600;
  font-family: Inter;
`;

const FollowingNumber = styled.p`
  font-family: Inter;
  user-select: none;
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: -1.65rem;
`;
