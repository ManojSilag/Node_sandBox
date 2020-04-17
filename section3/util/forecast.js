const request = require("request");
const https = require("https");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=aacdc3dd6dc3f5cc5a82899a8c519502&query=${lat},${long}&units=f`;

    request({ url, json: true }, (error, response) => {
      const {
        temperature,
        feelslike,
        weather_descriptions,
      } = response.body.current;

      if (error) {
        callback(error, undefined);
      }
      callback(undefined, { temperature, feelslike, weather_descriptions });
    });
};

module.exports = forecast;
