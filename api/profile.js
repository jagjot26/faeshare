const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const FollowerModel = require("../models/FollowerModel");
const PostModel = require("../models/PostModel");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
  newFollowerNotification,
  removeFollowerNotification,
} = require("../utils/notificationActions");

//GET PROFILE INFO
router.get("/:username", authMiddleware, async (req, res) => {
  const { username } = req.params;

  try {
    const user = await UserModel.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const profile = await ProfileModel.findOne({ user: user._id }).populate(
      "user"
    );
    const profileFollowStats = await FollowerModel.findOne({ user: user._id });

    return res.json({
      profile,
      followersLength:
        profileFollowStats.followers.length > 0
          ? profileFollowStats.followers.length
          : 0,
      followingLength:
        profileFollowStats.following.length > 0
          ? profileFollowStats.following.length
          : 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//GET POSTS OF USER
router.get("/posts/:username", authMiddleware, async (req, res) => {
  const { username } = req.params;

  try {
    const user = await UserModel.findOne({ username: username.toLowerCase() });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const posts = await PostModel.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("comments.user");
    //find({}) here finds all posts which have user set to user._id

    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

// GET FOLLOWERS
router.get("/followers/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await FollowerModel.findOne({ user: userId }).populate(
      "followers.user"
    );
    //followers is an array with user in it

    return res.json(user.followers); //only sending the followers array from the user model
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

// GET FOLLOWING
router.get("/following/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await FollowerModel.findOne({ user: userId }).populate(
      "following.user"
    );
    //followers is an array with user in it

    return res.json(user.following); //only sending the following array from the user model
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//FOLLOW A USER
router.post("/follow/:userToFollowId", authMiddleware, async (req, res) => {
  const { userId } = req; //this is from middleware
  const { userToFollowId } = req.params;

  try {
    const user = await FollowerModel.findOne({ user: userId });
    const userToFollow = await FollowerModel.findOne({ user: userToFollowId });
    if (!user || !userToFollow) {
      return res.status(404).send("User not found");
    }

    const isFollowing =
      user.following.length > 0 &&
      user.following.filter(
        (following) => following.user.toString() === userToFollowId
      ).length > 0; //toString is done bc in model, data type of user is ObjectId
    //here we're checking if the logged in user is already following the user in the req.params

    if (isFollowing) {
      return res.status(401).send("User already followed");
    }

    await user.following.unshift({ user: userToFollowId }); //adds usertoFollow's ID to the following model of the logged in user
    await user.save();
    await userToFollow.followers.unshift({ user: userId }); //adds user's (logged in user) id to the follower model of the userToFollow
    await userToFollow.save();

    await newFollowerNotification(userId, userToFollowId);

    return res.status(200).send("success");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//UNFOLLOW A USER
router.put("/unfollow/:userToUnfollowId", authMiddleware, async (req, res) => {
  const { userId } = req; //this is from middleware
  const { userToUnfollowId } = req.params;

  try {
    const user = await FollowerModel.findOne({ user: userId });
    const userToUnfollow = await FollowerModel.findOne({
      user: userToUnfollowId,
    });
    if (!user || !userToUnfollow) {
      return res.status(404).send("User not found");
    }

    const isNotFollowing =
      user.following.length > 0 &&
      user.following.filter(
        (following) => following.user.toString() === userToUnfollowId
      ).length === 0; //toString is done bc in model, data type of user is ObjectId
    //here we're checking if the logged in user is already following the user in the req.params

    if (isNotFollowing) {
      return res.status(401).send("User not followed previously");
    }

    const userToUnfollowIndex = user.following.findIndex(
      (following) => following.user.toString() === userToUnfollowId
    ); //getting the index of user to unfollow
    await user.following.splice(userToUnfollowIndex, 1);
    await user.save();

    const userIndex = userToUnfollow.followers.findIndex(
      (followers) => followers.user.toString() === userId
    );
    await userToUnfollow.followers.splice(userIndex, 1);
    await userToUnfollow.save();

    await removeFollowerNotification(userId, userToUnfollowId);

    return res.status(200).send("success");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//UPDATE PROFILE

//here, when we  update profile, in posts, user's profile pic gets updated because each post is tied to a user from the user model and when we fetch posts in /api/posts, we populate the user and get his profilePic from it. If we had profilePic as a field in POST MODEL, it wouldn't have updated when we updated the user
router.post("/update", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;

    const { bio, facebook, youtube, twitter, instagram, profilePicUrl } =
      req.body;
    let profileFields = {};
    profileFields.user = userId; //here we're referencing the id of the new user to the 'user' property of the ProfileModel (which is of the type user ID)

    if (bio) profileFields.bio = bio;

    profileFields.social = {};
    if (facebook) profileFields.social.facebook = facebook;
    if (youtube) profileFields.social.youtube = youtube;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;

    await ProfileModel.findOneAndUpdate(
      { user: userId },
      { $set: profileFields },
      { new: true }
    ); // we're finding the ProfileModel from userId and then $set is used to assign the new value
    //new means findOneAndUpdate returns us an object with updated values of that ProfileModel. Hover over new to know more

    if (profilePicUrl) {
      //add updated profilePicUrl to user's user model if usre sent it in req.body
      const user = await UserModel.findById(userId);
      user.profilePicUrl = profilePicUrl;
      await user.save();
    }

    return res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//UPDATE profilePicUrl and/or coverPicUrl
router.post("/updatepictures", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;

    const { profilePicUrl, coverPicUrl } = req.body;

    if (profilePicUrl) {
      //add updated profilePicUrl to user's user model if usre sent it in req.body
      const user = await UserModel.findById(userId);
      user.profilePicUrl = profilePicUrl;
      await user.save();
    }

    if (coverPicUrl) {
      //add updated profilePicUrl to user's user model if usre sent it in req.body
      const user = await UserModel.findById(userId);
      user.coverPicUrl = coverPicUrl;
      await user.save();
    }

    return res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//UPDATE PASSWORD (this IS NOT forgot password btw)
router.post("/settings/password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (newPassword.length < 6) {
      return res.status(401).send("Password must be atleast 6 characters");
    }

    const user = await UserModel.findById(req.userId).select("+password"); //in UserModel, select property is set to false. SO password is not returned by default when we select a user from the model. To get the password, we need to chain select and '+password'

    //to compare passwords
    const isPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isPassword) {
      return res.status(401).send("Invalid Password");
    }

    //if the currentPassword and user.password match, then update the password in the db
    user.password = await bcrypt.hash(newPassword, 10); //hash new password

    await user.save();
    return res.status(200).send("Updated");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//UPDATE MESSAGE POPUP SETTINGS
router.post("/settings/messagePopup", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (user.newMessagePopup) {
      //if it's true, we're setting it to false
      user.newMessagePopup = false;
      await user.save();
    } else {
      //otherwise we're setting it to true
      user.newMessagePopup = true;
      await user.save();
    }

    return res.status(200).send("success");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//Get all followers of all users and then return the first 5 results from top to bottom;
router.get("/home/youMayLikeToFollow", authMiddleware, async (req, res) => {
  try {
    const users = await FollowerModel.find({}).populate("user").limit(4);
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
