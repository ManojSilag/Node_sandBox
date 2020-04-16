const request = require("request");


const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibWFub2pzIiwiYSI6ImNrOTJkczZsNzAzdGUzbW84OHFxOHl6NjIifQ.p-zoFsz8pbhLKv5h8abrSw&limit=1`;
  request({ url, json: true }, (error, response) => {
    //   console.log('dev: geoCode -> response', response.body.features[0])
    //   console.log('dev: geoCode -> error', error)
    if (error) {
      callback(error, undefined);
    } else {
      const { center, place_name } = response.body.features[0];
      callback(undefined, { center, place_name });
    }
  });
};


module.exports = geoCode;