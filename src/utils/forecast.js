const request = require('request');
require('dotenv').config();
const accessKey = process.env.ACCESS_KEY
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key='+accessKey+'&query=' + latitude + "," + longitude;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.error) {
            callback('Location not found!', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions + ". The temperature is " + body.current.temperature + " °, It feels like "+body.current.feelslike + " ° and there is " + body.current.precip + "% chance of raining.");
        }
    })
}
module.exports = forecast;