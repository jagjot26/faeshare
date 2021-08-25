const mongoose = require("mongoose");
const Schema = mongoose.Schema; //creates a schema variable

const FollowerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  followers: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  following: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

module.exports = mongoose.model("Follower", FollowerSchema);
