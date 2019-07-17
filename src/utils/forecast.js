const request = require("request");

const forecast = (lat, long, callback) => {
        const url = `https://api.darksky.net/forecast/b55bce3286df5f9689ec09927076c854/${lat},${long}?units=si`;
        request({url: url, json: true}, (error, { body }) => {
        if(error) {
                callback("Unable to connect to weather service!")
            } else if (body.error) {
                callback("Unable to find location!")
            } else {
                callback(undefined, {
                    temp: body.currently.temperature,
                    rain: body.currently.precipProbability,
                    daily: body.daily.data[0].summary
                })
            }

})}






module.exports = forecast;