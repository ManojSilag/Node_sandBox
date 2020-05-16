const socket = io();
//Elements
const input = document.querySelector("#input");
const button = document.querySelector("#send");
const send_location = document.querySelector("#send-location");
const messgaes = document.querySelector("#messages");

//Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#locationmess-template")
  .innerHTML;
const sidebartemplate = document.querySelector("#sidebar-template").innerHTML;

//Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoScroll = () => {
  // New Message
  const newMessage = messgaes.lastElementChild;
  //Height of the new Message
  const newMessageStyle = getComputedStyle(newMessage);
  const newMessageMargin = parseInt(newMessageStyle.marginBottom);
  const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

  //Visible height
  const visibleHeight = messgaes.offsetHeight;
  console.log("dev: autoScroll -> visibleHeight", visibleHeight);

  //Height of messages container
  const containerHeight = messgaes.scrollHeight;
  console.log("dev: autoScroll -> containerHeight", containerHeight);

  //How far have I scrolled
  const scrollOffset = messgaes.scrollTop + visibleHeight;
  console.log("dev: autoScroll -> scrollOffset", scrollOffset);

  if (containerHeight - newMessageHeight <= scrollOffset) {
    messgaes.scrollTop = messgaes.scrollHeight;
  }
};

//----------------------------------------------------//
socket.on("message", (data) => {
  const html = Mustache.render(messageTemplate, {
    username: data.username,
    message: data.text,
    createdAt: moment(data.createdAt).format("h:mm a"),
  });
  messgaes.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

//----------------------------------------------------//
socket.on("LocationMessage", (locationmessgaes) => {
  const html = Mustache.render(locationTemplate, {
    username: locationmessgaes.username,
    location: locationmessgaes.url,
    createdAt: moment(locationmessgaes.createdAt).format("h:mm a"),
  });
  messgaes.insertAdjacentHTML("beforeend", html);
  autoScroll();
});
//--------------------------------------------------//
socket.on("roomData", ({ room, users }) => {
  console.log(room);
  console.log(users);
  const html = Mustache.render(sidebartemplate, {
    room,
    users,
  });
  const sidebar = document.querySelector("#sidebar");
  sidebar.innerHTML = html;
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  const value = input.value;
  button.setAttribute("disabled", "disabled");
  socket.emit("sendMessage", value, (error) => {
    button.removeAttribute("disabled");
    input.value = "";
    input.focus();
    if (error) {
      return console.log(error);
    }
  });
});

send_location.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolaction is not supported by your browser");
  }
  send_location.setAttribute("disabled", "disabled");
  send_location.innerHTML = "Sending..";
  navigator.geolocation.getCurrentPosition((postion) => {
    const { latitude, longitude } = postion.coords;
    const location = `Location: lat: ${latitude}, long: ${longitude}`;
    socket.emit("sendLocation", location, (message) => {
      send_location.removeAttribute("disabled");
      send_location.innerHTML = "Send Location";
    });
  });
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
