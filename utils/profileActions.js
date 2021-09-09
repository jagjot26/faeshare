import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import router from "next/router";
import catchErrors from "../utils/catchErrors";

const Axios = axios.create({
  baseURL: `${baseUrl}/api/profile`,
  headers: { Authorization: cookie.get("token") },
});

export const followUser = async (
  userToFollowId,
  setUserFollowStats,
  setLoadingFollowStats
) => {
  try {
    setLoadingFollowStats(true);
    await Axios.post(`/follow/${userToFollowId}`);

    setUserFollowStats((prev) => ({
      ...prev,
      following: [...prev.following, { user: userToFollowId }],
    }));
    //userFollowStats consists of followers and following. prev comprises of them both. we're spreading the prev and then updating following with the newly added following. since in followerModel, key is user, we also used user here
    setLoadingFollowStats(false);
  } catch (error) {
    alert(catchErrors(error));
  }
};

export const unfollowUser = async (
  userToUnfollowId,
  setUserFollowStats,
  setLoadingFollowStats
) => {
  try {
    setLoadingFollowStats(true);
    await Axios.put(`/unfollow/${userToUnfollowId}`);

    setUserFollowStats((prev) => ({
      ...prev,
      following: prev.following.filter(
        (following) => following.user !== userToUnfollowId
      ),
    })); //removes the userToUnfollow from the following array
    setLoadingFollowStats(false);
  } catch (error) {
    alert(catchErrors(error));
  }
};

//here, when we  update profile, in posts, user's profile pic gets updated because each post is tied to a user from the user model and when we fetch posts in /api/posts, we populate the user and get his profilePic from it. If we had profilePic as a field in POST MODEL, it wouldn't have updated when we updated the user
export const profileUpdate = async (
  profile,
  setLoading,
  setError,
  profilePicUrl
) => {
  try {
    const { bio, facebook, youtube, twitter, instagram } = profile;

    await Axios.post(`/update`, { ...profile, profilePicUrl });
    setLoading(false);
    router.reload();
  } catch (error) {
    setError(catchErrors(error));
    setLoading(false);
  }
};

export const profilePicturesUpdate = async (
  profilePicUrl,
  coverPicUrl,
  setLoading,
  setError
) => {
  try {
    await Axios.post(`/updatepictures`, { profilePicUrl, coverPicUrl });
    setLoading(false);
    router.reload();
  } catch (error) {
    console.log(error);
    setError(catchErrors(error));
    setLoading(false);
  }
};

export const passwordUpdate = async (setSuccess, userPasswords) => {
  try {
    const { currentPassword, newPassword } = userPasswords;

    await Axios.post(`/settings/password`, { currentPassword, newPassword });
    setSuccess(true);
  } catch (error) {
    alert(catchErrors(error));
  }
};

export const toggleMessagePopup = async (
  popupSetting,
  setPopupSetting,
  setSuccess
) => {
  try {
    await Axios.post(`/settings/messagePopup`);
    setPopupSetting(!popupSetting); //if it's true, it'll be set to false and vice versa
    setSuccess(true);
  } catch (error) {
    alert(catchErrors(error));
  }
};
