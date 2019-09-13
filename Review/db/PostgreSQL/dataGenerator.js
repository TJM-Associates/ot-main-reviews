/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const faker = require('faker');
const db = require('./pgConnection');

// console.log(db.client);
const genUserData = () => {
  const userArray = [];
  // Create 50 users for each restaurant
  for (let y = 0; y < 200; y++) {
    const obj = {
      username: faker.name.findName(),
      location: faker.address.city(),
      profilePicture: faker.image.avatar(),
      vipStatus: faker.random.boolean(),
      numberOfReviews: Math.floor(Math.random() * 200) + 1,
    };
    userArray.push(obj);
  }
  return userArray;
};

const genReviewData = () => {
  const masterReviewArray = [];
  for (let z = 1; z < 101; z++) {
    const eachRestReviewData = [];
    const numberOfReviews = Math.random() * (200 - 10) + 10;
    for (let x = 1; x < numberOfReviews; x++) {
      const obj = {
        overallRating: Math.floor(Math.random() * 5) + 1,
        foodRating: Math.floor(Math.random() * 5) + 1,
        serviceRating: Math.floor(Math.random() * 5) + 1,
        ambienceRating: Math.floor(Math.random() * 5) + 1,
        comment: faker.lorem.paragraph(),
        r_id: `r${z}`,
        u_id: x,
        date_dined: faker.date.past(),
      };
      eachRestReviewData.push(obj);
    }
    masterReviewArray.push(eachRestReviewData);
  }
  return masterReviewArray;
};


// ================ ADD DATA TO ABLE =====================
// Array of auto-generated users
const userArray = genUserData();

const populateUserTable = () => {
  const queryString = 'INSERT INTO users(user_name, location, number_of_reviews, profile_picture, vip_status) VALUES(?, ?, ?, ?, ?)';
  for (let i = 0; i < userArray.length; i++) {
    db.client.query(queryString,
      [userArray[i].username, userArray[i].location, userArray[i].numberOfReviews,
        userArray[i].profilePicture, userArray[i].vipStatus],
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          console.log(results);
        }
      });
  }
};
populateUserTable();


const reviewArray = genReviewData();

const populateReviewsTable = (array) => {
  for (let a = 0; a < array.length; a++) {
    const queryString = 'INSERT INTO reviews(overall_rating, food_rating, service_rating, ambience_rating, comment, date_dined, r_id, u_id) VALUES (?,?,?,?,?,?,?, (SELECT user_id from users WHERE user_id = ?))';
    for (let b = 0; b < array[a].length; b++) {
      db.client.query(queryString, [array[a][b].overallRating, array[a][b].foodRating,
        array[a][b].serviceRating, array[a][b].ambienceRating, array[a][b].comment,
        array[a][b].date_dined, array[a][b].r_id, array[a][b].u_id],
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          console.log(results);
        }
      });
    }
  }
};

populateReviewsTable(reviewArray);

// console.log(reviewArray)
// db.client.connection.end();
