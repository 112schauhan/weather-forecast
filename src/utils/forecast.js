'use strict';
const request=require('request')
const forecast=(longitude,latitude,callback)=>{
    const url =
    'https://api.darksky.net/forecast/0451c3e93bd580a69c1d659364fac22a/' +
    longitude+
    ',' +
    latitude+
    '?units=si';
request({ url: url, json: true }, (error, {body}) => {
    if (error) {
        callback('check your connection',undefined);
    } else if (body.error) {
        // 		//! point to notice finding error in URL
        // 		//! and using object destructuring
        callback('check your url',undefined);
    } else {
        callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.summary+' and '+body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
    }
});
}
module.exports=forecast
