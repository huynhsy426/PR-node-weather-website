const request = require("request");

const isNotNumber = (data) => {
  return typeof data !== "number";
};

//
// Goal: Add new data to forecast
//
// 1. Update the forecast string to include new data
// 2. Commit your changes
// 3. Push your changes to GitHub and deploy to Heroku
// 4. Test your work in the live application!

const forecast = (latitude, longitude, callback) => {
  if (isNotNumber(latitude) || isNotNumber(latitude)) {
    return callback("Wrong number", undefined);
  }

  const url =
    "https://api.weatherstack.com/current?access_key=4136a21fb5b4fc90d4fb07eb39211223&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      console.log(body);
      callback(
        undefined,
        "It is currently " +
          body.current.weather_descriptions.toString() +
          ". This high today is " +
          body.current.temperature +
          ". It feels like " +
          body.current.feelslike +
          " degress out. The humidity is " +
          body.current.humidity +
          "%."
      );
    }
  });
};

module.exports = forecast;
