const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3eaddacb1919e39dfb54d1993add1ec8&query=' + latitude + "," + longitude;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.error) {
            callback('Location not found!', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions + ". The temperature is " + body.current.temperature + " Degrees and there is " + body.current.precip + "% chance of raining");
        }
    })
}
module.exports = forecast;