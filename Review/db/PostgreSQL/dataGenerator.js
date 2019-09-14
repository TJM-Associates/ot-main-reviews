/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const faker = require('faker');
// eslint-disable-next-line prefer-const
const fs = require('fs');
const pg = require('pg');
const { Client, Pool } = require('pg');
const fastcsv = require('fast-csv');


// console.log(db.client);

// restaurant Generator
const getRestaurantData = () => {
  const restaurantArray = [];
  for (let x = 0; x < 100000; x++) {
    const obj = {
      r_id: `r${x}`,
      restaurant_name: faker.company.companyName(),
    };
    restaurantArray.push(obj);
  }
  return restaurantArray;
};

const restaurants = getRestaurantData();

const ws = fs.createWriteStream('restaurants.csv');
fastcsv.write(restaurants, { headers: true })
  .pipe(ws);

// console.time('concatenation');
// console.timeEnd('concatenation');

// userGenerator
const genUserData = () => {
  const userArray = [];
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

// review Generator
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


// ================ WRITE DATA  =====================

const writeRestaurants = fs.createWriteStream('restaurants.csv');
writeRestaurants.write('r_id,restaurant_name\n', 'utf8');

function writeTenMillionUsers(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const r_id = `r${id}`;
      const restaurant_name = faker.company.companyName();
      const data = `${r_id},${restaurant_name}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionUsers(writeRestaurants, 'utf-8', () => {
  writeRestaurants.end();
});
// create connection
const client = new pg.Client({
  user: 'michaelkim',
  host: 'localhost',
  database: 'review',
  password: 'password',
  port: 5432,
});
// check Connection
// client.connect((err) => {
//   if (err) {
//     console.log(err.stack);
//   } else {
//     console.log('connected to node-gres');
//   }
// });


const restaurantArray = getRestaurantData();
// console.log(restaurantArray);
function insertRestaurantTable() {
  for (let i = 0; i < restaurantArray.length; i++) {
    const query = `INSERT INTO restaurants(r_id, restaurant_name) VALUES('${restaurantArray[i].r_id}', '${restaurantArray[i].restaurant_name}')`;
    console.log(i); 
    client.query(query, (err, res) => {
      // console.log(err, res);
    });
  }
};

// console.log(restaurantArray);
// insertRestaurantTable();

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
// populateUserTable();


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

// populateReviewsTable(reviewArray);

// console.log(reviewArray)
// db.client.connection.end();
