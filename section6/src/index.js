const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3001;
const publicDirectoryPath = path.join(__dirname, "../public/");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("new io connection");

  socket.emit("message", "Welcome!!");
  socket.broadcast.emit("message", "A new user has joined");

  socket.on("sendMessage", (message) => {
    console.log("server: message", message);
    io.emit("message", message);
  });

  socket.on("sendLocation", (message) => {
    console.log("dev: message", message);
    const { latitude, longitude } = message;
    socket.broadcast.emit(
      "message",
      `https://google.com/maps?q=${latitude},${longitude}`
    );
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });
});

server.listen(port, () => {
  console.log("app listing on ", port);
});
