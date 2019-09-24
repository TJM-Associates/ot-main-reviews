/* eslint-disable spaced-comment */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable no-plusplus */
const faker = require('faker');
// const model = require('../models/placesModel.js');

const placeList = [];

for (let i = 0; i < 100; i++) {
  const place = {
    r_id VARCHAR(50) NOT NULL,
    u_id int NOT NULL,
    date_dined date NOT NULL,
    id: i,
    overallRating: Math.floor(Math.random() * 5) + 1,
    foodRating: Math.floor(Math.random() * 5) + 1,
    serviceRating: Math.floor(Math.random() * 5) + 1,
    ambienceRating: Math.floor(Math.random() * 5) + 1,
    r_id: Math.floor(Math.random() * 5) + 1,
    reviews: Math.floor(Math.random() * 200 + 100),
  };
  placeList.push(place);
}

const savePlaces = (placeList) => { // PLACELIST is an array of objects
  const placeArray = [];
  // var parsedPlaces = JSON.parse(placeList); //array of repo objects

  for (let i = 0; i < placeList.length; i++) {
    const placesObj = {};
    placesObj.id = placeList[i].id;
    placesObj.photoUrl = placeList[i].photoUrl,
    placesObj.title = placeList[i].title,
    placesObj.city = placeList[i].city,
    placesObj.propertyType = placeList[i].propertyType,
    placesObj.price = placeList[i].price,
    placesObj.reviews = placeList[i].reviews;

    const place = new model.Place(placesObj); // new document

    place.save((err) => {
      if (err) {
        console.log(err);
      } else {
        //saved
      }
    });

    placeArray.push(placesObj);
  }

  console.log('bbb');
};
savePlaces(placeList);
