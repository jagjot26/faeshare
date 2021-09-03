const NotificationModel = require("../models/NotificationModel");
const FollowerModel = require("../models/FollowerModel");
const UserModel = require("../models/UserModel");

//set the Notification to unread, or set unreadNotification to TRUE in user model
const setNotificationToUnread = async (userId) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user.unreadNotification) {
      user.unreadNotification = true;
      await user.save();
    }

    return;
  } catch (error) {
    console.log(error);
  }
};

const newLikeNotification = async (userId, postId, userToNotifyId) => {
  try {
    const userToNotify = await NotificationModel.findOne({
      user: userToNotifyId,
    });
    //user who receives notification or who has to be notified

    const newNotification = {
      type: "newLike",
      user: userId,
      //user who sent the notification
      post: postId,
      date: Date.now(),
    };

    await userToNotify.notifications.unshift(newNotification);
    await userToNotify.save();

    await setNotificationToUnread(userToNotifyId);
    return;
  } catch (error) {
    console.log(error);
  }
};

//remove the likeNotification from user's notification model
//........LEGACY
// const removeLikeNotification = async (userId, postId, userToNotifyId) => {
//   try {
//     const user = await NotificationModel.findOne({ user: userToNotifyId });
//     const notificationToRemoveIndex = user.notifications.findIndex(
//       (notification) =>
//         notification.type === "newLike" &&
//         notification.post.toString() === postId &&
//         notification.user.toString() === userId
//     );

//     await user.notifications.splice(notificationToRemoveIndex, 1);
//     await user.save();
//   } catch (error) {
//     console.log(error);
//   }
// };
//..........UPDATED
const removeLikeNotification = async (userId, postId, userToNotifyId) => {
  try {
    // Here we are simply using $pull operator to remove the notification from notifications array.
    // Notice we are finding the notification inside Notifications array by adding its type, userId & postId

    await NotificationModel.findOneAndUpdate(
      { user: userToNotifyId },
      {
        $pull: {
          notifications: {
            type: "newLike",
            user: userId,
            post: postId,
          },
        },
      }
    );

    return;
  } catch (error) {
    console.error(error);
  }
};

const newCommentNotification = async (
  postId,
  commentId,
  userId,
  userToNotifyId,
  text
) => {
  try {
    const userToNotify = await NotificationModel.findOne({
      user: userToNotifyId,
    });

    const newNotification = {
      type: "newComment",
      user: userId,
      post: postId,
      commentId,
      text,
      date: Date.now(),
    };

    await userToNotify.notifications.unshift(newNotification);

    await userToNotify.save();

    await setNotificationToUnread(userToNotifyId);
    return;
  } catch (error) {
    console.log(error);
  }
};

const removeCommentNotification = async (
  postId,
  commentId,
  userId,
  userToNotifyId
) => {
  try {
    await NotificationModel.findOneAndUpdate(
      { user: userToNotifyId },
      {
        $pull: {
          notifications: {
            type: "newComment",
            user: userId,
            post: postId,
            commentId: commentId,
          },
        },
      }
    );

    return;
  } catch (error) {
    console.error(error);
  }
};

const newFollowerNotification = async (userId, userToNotifyId) => {
  try {
    const user = await NotificationModel.findOne({ user: userToNotifyId });

    const newNotification = {
      type: "newFollower",
      user: userId,
      date: Date.now(),
    };

    await user.notifications.unshift(newNotification);

    await user.save();

    await setNotificationToUnread(userToNotifyId);
    return;
  } catch (error) {
    console.log(error);
  }
};

const removeFollowerNotification = async (userId, userToNotifyId) => {
  try {
    await NotificationModel.findOneAndUpdate(
      { user: userToNotifyId },
      {
        $pull: {
          notifications: {
            type: "newFollower",
            user: userId,
          },
        },
      }
    );

    return;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  newLikeNotification,
  removeLikeNotification,
  newCommentNotification,
  removeCommentNotification,
  newFollowerNotification,
  removeFollowerNotification,
};
