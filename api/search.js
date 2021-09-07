const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");

router.get("/:searchText", authMiddleware, async (req, res) => {
  const { searchText } = req.params;
  const { userId } = req;

  if (searchText.length === 0) return;

  try {
    const results = await UserModel.find({
      name: { $regex: searchText, $options: "i" },
    }); //options: i means that it will be case insensitive

    //checking if any of the result is the same as logged in user
    const resultsToBeSent =
      results.length > 0 &&
      results.filter((result) => result._id.toString() !== userId);

    res.status(200).json(resultsToBeSent);
  } catch (error) {
    console.log(error);
    return res.status().send("Server error");
  }
});

module.exports = router;
