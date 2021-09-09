import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Facebook } from "react-content-loader";

function FollowingUsers({ profile, userFollowStats, user }) {
  const router = useRouter();
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;
    const getFollowing = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `${baseUrl}/api/profile/following/${profile.user._id}`,
          {
            headers: { Authorization: cookie.get("token") },
          }
        );

        !didCancel && setFollowing(res.data);
      } catch (error) {
        alert("Error Loading Following");
      }

      !didCancel && setLoading(false);
    };

    getFollowing();
    return () => {
      didCancel = true;
    };
  }, []); //this runs on first component render

  return (
    <div
      style={{ fontFamily: "Inter" }}
      className="bg-white rounded-2xl shadow-md  mt-5 p-5"
    >
      <div className="flex justify-between">
        <div className="flex">
          <h1
            className="text-2xl font-semibold"
            style={{ fontFamily: "inherit" }}
          >
            Following ·
          </h1>
          <span
            className="ml-1 text-gray-500 text-lg"
            style={{ marginTop: ".15rem" }}
          >
            {following && following.length > 0 ? following.length : "0"}
          </span>
        </div>

        {following && following.length > 0 && (
          <p
            onClick={() => router.push(`/user/${profile.user._id}/following`)}
            className="text-md font-normal cursor-pointer select-none text-purple-400 hover:underline"
            style={{ fontFamily: "inherit" }}
          >
            View All
          </p>
        )}
      </div>

      {loading ? (
        <Facebook />
      ) : (
        <>
          {following && following.length > 0 ? (
            <GridContainer>
              {following.map((fol) => (
                <div
                  className="mb-5 cursor-pointer"
                  key={fol.user._id}
                  onClick={() => router.push(`/${fol.user.username}`)}
                >
                  <FollowingImage src={fol.user.profilePicUrl} alt="userprof" />
                  <NameOfUser
                    onClick={() => router.push(`/${fol.user.username}`)}
                  >
                    {fol.user.name}
                  </NameOfUser>
                </div>
              ))}
            </GridContainer>
          ) : profile.user._id === user._id ? (
            <p className="text-md text-gray-500">
              {`You've not followed anyone. What are you waiting for?`}
            </p>
          ) : (
            <p className="text-md text-gray-500">{`${profile.user.name} hasn't followed anyone yet.`}</p>
          )}
        </>
      )}
    </div>
  );
}

export default FollowingUsers;

const FollowingImage = styled.img`
  width: 7.6rem;
  height: 7.6rem;
  border-radius: 0.5rem;
  object-fit: cover;
  border: 1px solid #efefef;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  column-gap: 1rem;
`;

const NameOfUser = styled.div`
  font-family: inherit;
  font-weight: 600;
  font-size: 0.95rem;
  margin-top: 0.1rem;
  :hover {
    text-decoration: underline;
  }
`;
