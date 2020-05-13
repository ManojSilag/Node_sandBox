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

socket.on("message", (data) => {
  console.log(data);
  const html = Mustache.render(messageTemplate, {
    message: data.text,
    createdAt: moment(data.createdAt).format("h:mm a"),
  });
  messgaes.insertAdjacentHTML("beforebegin", html);
});

socket.on("LocationMessage", (locationmessgaes) => {
  const html = Mustache.render(locationTemplate, {
    location: locationmessgaes,
  });
  messgaes.insertAdjacentHTML("beforebegin", html);
  console.log(locationmessgaes);
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
    console.log("The message was diliverd");
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
