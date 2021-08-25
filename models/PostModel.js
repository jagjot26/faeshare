const mongoose = require("mongoose");
const Schema = mongoose.Schema; //creates a schema variable

const PostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    location: { type: String },
    picUrl: { type: String },
    likes: [{ user: { type: Schema.Types.ObjectId, ref: "User" } }],
    comments: [
      // by default, if we dont provide any _id, mongo db adds it by itself. But we can override that by specifying _id ourselves
      {
        _id: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
