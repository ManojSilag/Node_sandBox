const socket = io();

socket.on("message", (data) => {
  console.log(data);
});

const input = document.querySelector("#input");
const button = document.querySelector("#send");
const send_location = document.querySelector("#send-location");

button.addEventListener("click", (e) => {
  e.preventDefault();
  const value = input.value;
  socket.emit("sendMessage", value);
});

send_location.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolaction is not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition((postion) => {
    const { latitude, longitude } = postion.coords;
    const location = `Location: lat: ${latitude}, long: ${longitude}`;
    socket.emit("sendLocation", location);
  });
});
