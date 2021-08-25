const mongoose = require("mongoose");
const Schema = mongoose.Schema; //creates a schema variable

const UserSchema = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true, select: false },
    //select means that password field will not appear in the backend

    username: { type: String, required: true, unique: true, trim: true },

    profilePicUrl: { type: String },

    coverPicUrl: {type: String},

    newMessagePopup: { type: Boolean, default: true },

    unreadMessage: { type: Boolean, default: false },

    unreadNotification: { type: Boolean, default: false },

    role: { type: String, default: "user", enum: ["user", "root"] },
    //enum tells mongoose that there can only be two values for role, i.e. 'user' and 'root'

    resetToken: { type: String },

    expireToken: { type: Date },
    //token sent to user for password reset will be valid for 1 hour. We'll check that validity using this expire token
  },
  { timestamps: true }
); //timestamps are auto added to the databse and they tell when the user was created

module.exports = mongoose.model("User", UserSchema);
