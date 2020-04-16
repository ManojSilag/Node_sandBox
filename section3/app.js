const request = require("request");
const geoCode = require("./util/geocode");
// const url =
//   "http://api.weatherstack.com/current?access_key=aacdc3dd6dc3f5cc5a82899a8c519502&query=37.8267,-122.4233&units=f";

// request({ url, json: true }, (error, response) => {
//   const {
//     temperature,
//     feelslike,
//     weather_descriptions,
//   } = response.body.current;
//   console.log(
//     ` It is ${weather_descriptions[0]}. It is currently ${temperature} F out.But it feels like ${feelslike} F outside.`
//   );
// });

// const geoCodeUrl =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWFub2pzIiwiYSI6ImNrOTJkczZsNzAzdGUzbW84OHFxOHl6NjIifQ.p-zoFsz8pbhLKv5h8abrSw&limit=1";
// request({ url: geoCodeUrl, json: true }, (error, response) => {
//   const { center } = response.body.features[0];
//   console.log(`latitude: ${center[1]} and longitude: ${center[0]}`);
// });



geoCode("Ahmednagar", (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
    console.log(`latitude: ${data.center[1]} and longitude: ${data.center[0]}`);
  }
  //
  //  
});
