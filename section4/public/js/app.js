console.log("Client side js");

// fetch(`http://puzzle.mead.io/puzzle`).then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg = document.querySelector("#msg");
const errormsg = document.querySelector("#errormsg");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  msg.textContent = "";
  errormsg.textContent = "";
  msg.textContent = "Loading....";
  const location = search.value;
  console.log(location);
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response
        .json()
        .then((data) => {
          console.log(data);
          msg.textContent = "";
          msg.textContent = `location: ${data.location}, Forecast: ${data.forecast} `;
        })
        .catch((error) => {
          console.log(error);
          msg.textContent = "";
          errormsg.textContent = `Error`;
        });
    }
  );
});
