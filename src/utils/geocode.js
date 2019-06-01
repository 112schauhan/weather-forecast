'use strict'
const request= require('request')

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		address +
		'.json?access_token=pk.eyJ1IjoibW91cnJyeWEiLCJhIjoiY2p3MXY3MDJ4MDBrYjRjbzVhbHF6bGZtdSJ9.TWM00ShSyImjXkABf9mgQw&limit=1';
	request({ url, json: true }, (error, {body}) => {
		if (error) {
			callback('their was an network error', undefined);
		} else if (body.features.length === 0) {
			// 		//! point to notice finding error in URL
			callback('check the url again', undefined);
		} else {
			const latitude = body.features[0].center[0];
			const longitude = body.features[0].center[1];
			const place = body.features[0].place_name;
			callback(undefined, {
				 latitude,
				 longitude,
				 place
			});
		}
	});
};

module.exports=geocode