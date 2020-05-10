const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const UserOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: UserOneId,
  name: "Mike",
  email: "mike@gmail.com",
  password: "mike123",
  tokens: [
    {
      token: jwt.sign({ _id: UserOneId }, process.env.JWT_SECRET),
    },
  ],
};

const UserTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: UserTwoId,
  name: "nena",
  email: "nena@gmail.com",
  password: "nena123",
  tokens: [
    {
      token: jwt.sign({ _id: UserTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First task",
  owner: UserOneId,
};

const tasktwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second task",
  completed: true,
  owner: UserOneId,
};

const taskthree = {
  _id: new mongoose.Types.ObjectId(),
  description: "third task",
  completed: true,
  owner: UserTwoId,
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(tasktwo).save();
  await new Task(taskthree).save();
};

module.exports = {
  UserOneId,
  userOne,
  userTwo,
  UserTwoId,
  taskOne,
  tasktwo,
  taskthree,
  setUpDatabase,
};
