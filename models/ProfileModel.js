const mongoose = require("mongoose");
const Schema = mongoose.Schema; //creates a schema variable

const ProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    //ref mentioned ("User") has to match with the name of the UserSchema, i.e. "User" again
    bio: { type: String, required: true },
    social: {
      youtube: { type: String },
      twitter: { type: String },
      facebook: { type: String },
      instagram: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
