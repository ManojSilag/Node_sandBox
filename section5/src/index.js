const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/users");
const taskRouter = require("./routers/tasks");
const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET REQuest disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send("Site Under Maintanance");
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const myFunction = async () => {
//   // const password = 'Manoj!1233';
//   // console.log('dev: myFunction -> password', password)
//   // const hassedPassword = await bcrypt.hash(password, 8);
//   // console.log('dev: myFunction -> hassedPassword', hassedPassword)
//   // const isMatch = await bcrypt.compare('Manoj!1233', hassedPassword)
//   // console.log('dev: myFunction -> isMatch', isMatch);

//   const token = jwt.sign({ _id: "abcdefghijkl" }, "thisIsmyNewLearn", {
//     expiresIn: "1 hour",
//   });
//   console.log("dev: myFunction -> token", token);

//   const data = jwt.verify(token, "thisIsmyNewLearn");
//   console.log("dev: myFunction -> data", data);
// };
// // myFunction();
const Task = require('./models/task');
// const User = require('./models/user');

// const main = async() =>{
//   const task = await Task.findById('5eabbfd540ad13154a1984a1');
//   await task.populate('owner').execPopulate();
//   console.log('dev: main -> task', task)
  
// }

// main()