let users = [];

const addUser = async (userId, socketId) => {
  //userId: user._id, id of logger in user
  //socketId: id of socket or server room id. regenerated on every connection
  const user = users.find((user) => user.userId === userId);

  if (user && user.socketId === socketId) {
    return users;
  } else {
    //if user exists but socketId doesn't match
    //prob means that user is still in there from an old connection
    if (user && user.socketId !== socketId) {
      await removeUser(user.socketId);
    }
    //in case when user doesn't exist
    const newUser = { userId, socketId };
    users.push(newUser);
    return users;
  }
};

const removeUser = async (socketId) => {
  const indexOf = users.map((user) => user.socketId).indexOf(socketId);
  await users.splice(indexOf, 1);
  return;
};

module.exports = { addUser, removeUser };
