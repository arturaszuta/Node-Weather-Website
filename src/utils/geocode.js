const request = require("request");

const geocode = (address, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZWVkZXYiLCJhIjoiY2p2Mm1mb2JvMjZndDQ0cGYwcmwwY2NqYyJ9.G-cCK7Y-GnseKqc95wfUBw`;

    request({url: geoUrl, json: true}, (error,{body}) => {

            if(error) {
                callback("Unable to connect to location services!")
            } else if (body.features.length == 0) {
                callback("Cannot find that location!. Try another search.");
            } else {
            callback(undefined, {
                lat: body.features[0].center[1], 
                long: body.features[0].center[0], 
                location: body.features[0].place_name
            }); 
        }});
};


module.exports = geocode;