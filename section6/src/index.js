const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3001;
const publicDirectoryPath = path.join(__dirname, "../public/");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("new io connection");

  socket.on("join", ({ username, room }) => {
    socket.join(room);

    socket.emit("message", generateMessage("Welcome!!!"));
    socket.broadcast
      .to(room)
      .emit("message", generateMessage(`${username} has joined`));

    // io.to.emit -> to everyone in room
    //socket.brodcast.to.emit ->to everyone in room except self in room
  });

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed");
    }
    io.emit("message", generateMessage(message));
    callback();
  });

  socket.on("sendLocation", (message, callback) => {
    const { latitude, longitude } = message;
    io.emit(
      "LocationMessage",
      generateLocationMessage(
        `https://google.com/maps?q=${latitude},${longitude}`
      )
    );

    callback("Location Shared!!");
  });

  socket.on("disconnect", () => {
    io.emit("message", generateMessage("A user has left"));
  });
});

server.listen(port, () => {
  console.log("app listing on ", port);
});
