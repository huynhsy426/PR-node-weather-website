const request = require('request')

const geocode = (address, callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaHV5bmhzeTQyNiIsImEiOiJjbWF2bXl0anowNmMyMm1xMGo4YXN4cWFpIn0.Bcp2IHZYguTpp2FhGB4FXw&limit=1"

  request({ url, json: true }, (error, { body } = {}) => {
      if(error) {
      callback('Unable to connect to location service!', undefined)
    } else if (!body.features || body.features?.length === 0) {
      callback('Unable to find location. Try anther search.', undefined)
      console.log('Unable to find location!')
    } else {
      const data = body.features;
      const latitude = data[0].center[1];
      const longitude = data[0].center[0];
      const location = data[0].place_name;

      callback(undefined, {latitude, longitude, location })
    }
  })
}

module.exports = geocode