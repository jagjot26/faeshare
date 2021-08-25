const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  notifications: [
    {
      type: { type: String, enum: ["newLike", "newComment", "newFollower"] },
      //the user from whom this notification is
      user: { type: Schema.Types.ObjectId, ref: "User" },
      post: { type: Schema.Types.ObjectId, ref: "Post" },
      commentId: { type: String },
      text: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Notification", NotificationSchema);
