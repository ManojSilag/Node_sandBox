const geoCode = require("./util/geocode");
const forcast = require("./util/forecast");
const place = process.argv[2]
// console.log('dev: place', place)

if(place){
geoCode(place, (error, data) => {
  if (error) {
    return console.log(error);
  } else {
    // console.log(data);
    // console.log(`latitude: ${data.center[1]} and longitude: ${data.center[0]}`);
    const { place_name } = data;

    forcast(data.center[1], data.center[0], (error, data) => {
      // if (error) {
      //   return console.log("Error", error);
      // } else {
      //   const { temperature, feelslike, weather_descriptions } = data;
      //   console.log(
      //     ` It is ${weather_descriptions[0]}. It is currently ${temperature} F out.But it feels like ${feelslike} F outside. In ${place_name}`
      //   );
      // }
    });
  }
});
}else{
  console.log('Please provide location');
  
}
