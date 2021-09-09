const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");

const FollowerModel = require("../models/FollowerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //to encrypt password
const isEmail = require("validator/lib/isEmail");
const authMiddleware = require("../middleware/authMiddleware");
const ChatModel = require("../models/ChatModel");

router.get("/", authMiddleware, async (req, res) => {
  const { userId } = req; //in the middleware we had req.userId = userId;

  try {
    const user = await UserModel.findById(userId);
    const userFollowStats = await FollowerModel.findOne({ user: userId });

    return res.status(200).json({ user, userFollowStats });
  } catch (error) {
    console.log(error);
    return res.status().send("Server error");
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body.user;

  if (!isEmail(email)) return res.status(401).send("Invalid Email");

  if (password.length < 6)
    return res.status(401).send("Password must be atleast 6 characters");

  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
      "+password"
    ); //In UserModel, in password, we set select to false. The password field will not be included when we search for a user.
    if (!user) {
      return res.status(401).send("Invalid Credentials");
    }

    //if user exists with the given email, then compare passwords
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(401).send("Invalid Credentials");
    }

    const chatModel = await ChatModel.findOne({ user: user._id });

    if (!chatModel) {
      await new ChatModel({ user: user._id, chats: [] }).save();
    }

    //if isPassword is true i.e. passwords match, then we'll send back the jwt token
    const payload = { userId: user._id };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
