const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const NotificationModel = require("../models/NotificationModel");
const UserModel = require("../models/UserModel");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await NotificationModel.findOne({ user: userId })
      .populate("notifications.user")
      .populate("notifications.post");
    //populating to get the user details and the post details
    return res.json(user.notifications);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await UserModel.findById(userId);

    //set user.unread notification to false if it's already true (used from frontend to set it to false).
    if (user.unreadNotification) {
      user.unreadNotification = false;
      await user.save();
    }

    return res.status(200).send("Updated");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
