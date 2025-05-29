const request = require('request')

const isNotNumber = (data) => {
  return typeof data !== 'number'
}

const forecast = (latitude, longitude, callback) => {
  if(isNotNumber(latitude) || isNotNumber(latitude)) {
    return callback('Wrong number', undefined)
  }

  const url = 'https://api.weatherstack.com/current?access_key=4136a21fb5b4fc90d4fb07eb39211223&query='
    + latitude
    + ','
    + longitude
    +'&units=m'

  request({ url, json: true }, (error, { body } = {}) => {
    if(error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {

      callback(undefined,'It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degress out.')
    }
  })
}

module.exports = forecast