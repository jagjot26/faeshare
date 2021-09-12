const ChatModel = require("../models/ChatModel");
const UserModel = require("../models/UserModel");

const loadTexts = async (userId, textsWith) => {
  try {
    const chatUser = await ChatModel.findOne({ user: userId }).populate(
      "chats.textsWith"
    );
    const chat = chatUser.chats.find(
      (chat) => chat.textsWith._id.toString() === textsWith
    );
    //here, there's no _id after chat.messsagesWith as we haven't populated the data
    //if we weren't populating, then we would've written chat.messagesWith since _id field wont be there

    if (!chat) {
      const textsWithUser = await UserModel.findById(textsWith);

      const textsWithDetails = {
        name: textsWithUser.name,
        profilePicUrl: textsWithUser.profilePicUrl,
        id: textsWithUser._id,
      };
      return {
        textsWithDetails,
      };
    }
    return { chat };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getUserInfo = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    if (user) {
      const userDetails = {
        name: user.name,
        profilePicUrl: user.profilePicUrl,
        id: user._id,
      };
      return {
        userDetails,
      };
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

const sendText = async (userId, userToTextId, text) => {
  try {
    const loggedInUser = await ChatModel.findOne({ user: userId });

    const textToSendUser = await ChatModel.findOne({ user: userToTextId });

    const newText = {
      sender: userId,
      receiver: userToTextId,
      text,
      date: Date.now(),
    };

    //--SENDER--
    const previousChat =
      loggedInUser.chats.length > 0 &&
      loggedInUser.chats.find(
        (chat) => chat.textsWith.toString() === userToTextId
      );

    if (previousChat) {
      previousChat.texts.push(newText);
    } else {
      const newChat = {
        textsWith: userToTextId,
        texts: [newText],
      };

      loggedInUser.chats.unshift(newChat);
    }
    await loggedInUser.save();
    //--RECEIVER
    const lastChat =
      textToSendUser.chats.length > 0 &&
      textToSendUser.chats.find((chat) => chat.textsWith.toString() === userId);
    if (lastChat) {
      lastChat.texts.push(newText);
    } else {
      const newChat = {
        textsWith: userId,
        texts: [newText],
      };

      textToSendUser.chats.unshift(newChat);
    }
    await textToSendUser.save();
    return { newText };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const setMessageToUnread = async (userId) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user.unreadMessage) {
      user.unreadMessage = true;
      await user.save();
    }

    return;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { loadTexts, sendText, setMessageToUnread, getUserInfo };
