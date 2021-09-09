const mongoose = require("mongoose");
const Schema = mongoose.Schema; //creates Schema

const ChatSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  chats: [
    {
      textsWith: { type: Schema.Types.ObjectId, ref: "User" },
      texts: [
        {
          text: { type: String, required: true },
          sender: { type: Schema.Types.ObjectId, ref: "User" },
          receiver: { type: Schema.Types.ObjectId, ref: "User" },
          date: { type: Date },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Chat", ChatSchema);
