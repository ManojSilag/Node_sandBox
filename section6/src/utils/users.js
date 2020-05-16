const users = [];

//Add user
const addUser = ({ id, username, room }) => {
  //Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //Validate the data
  if (!username || !room) {
    return {
      error: "Username and room required",
    };
  }

  //check for exxisting user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  //Validate userName
  if (existingUser) {
    return {
      error: "Username is in use",
    };
  }

  //Store user
  const user = { id, username, room };

  users.push(user);
  return { user };
};

//Remove User
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

//getUser

const getUser = (id) => {
  const searchedUser = users.find((user) => user.id === id);
  if (!searchedUser) {
    return {
      error: "No user found",
    };
  }
  return searchedUser;
};

//getUsersInRoom
const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  const roomUsers = users.filter((user) => user.room === room);

  if (!roomUsers) {
    return {
      error: "No users in room",
    };
  }

  return roomUsers;
};

// addUser({
//   id: 12,
//   username: "manoj",
//   room: "soom",
// });

// addUser({
//   id: 22,
//   username: "vinod",
//   room: "soom",
// });

// addUser({
//   id: 33,
//   username: "kanoj",
//   room: "boom",
// });

// addUser({
//   id: 43,
//   username: "panoj",
//   room: "boom",
// });

// // console.log(getUser(43));
// console.log(getUsersInRoom("soom"));

module.exports = {
  addUser,
  getUser,
  getUsersInRoom,
  removeUser,
};
