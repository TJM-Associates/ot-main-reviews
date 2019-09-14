/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const faker = require('faker');
// eslint-disable-next-line prefer-const
const fs = require('fs');


// ================ WRITE DATA  =====================

const writeRestaurants = fs.createWriteStream('restaurants.csv');
writeRestaurants.write('r_id,restaurant_name\n', 'utf8');

function writeTenMillionRestaurants(writer, encoding, callback) {
  let i = 10000000;
  const write = () => {
    let ok = true;
    while (i > 0 && ok) {
      i -= 1;
      const r_id = i + 1;
      const restaurant_name = `r${i + 1}`;
      // const restaurant_name = faker.company.companyName();
      const data = `${r_id}, ${restaurant_name}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
      if (i % 1000000 === 0) {
        console.log(i);
      }
    }
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
}

writeTenMillionRestaurants(writeRestaurants, 'utf-8', () => {
  writeRestaurants.end();
});

// Write Reviews
// const writeReviews = fs.createWriteStream('reviews.csv');
// writeReviews.write('id,overall_rating,food_rating, service_rating,ambience_rating,comment, r_id, u_id, date_dined\n', 'utf8');

// function addReviews(writer, encoding, callback) {
//   let i = 250000000;
//   let u_id = 0;
//   let r_id = 0;
//   let id = 0;
//   function write() {
//     let ok = true;
//     do {
//       i -= 1;
//       id += 1;
//       const overall_rating = faker.internet.userName();
//       const food_rating = faker.address.city();
//       const service_rating = Math.floor(Math.random() * 200) + 1;
//       const ambience_rating = faker.image.avatar();
//       const comment = faker.random.boolean();
//       u_id += 1;
//       r_id += 1;
//       const date_dined = faker.date.past();
//       const data = `${id},${overall_rating},${food_rating},${service_rating},${ambience_rating},${comment}, ${u_id}, ${r_id}, ${date_dined}\n`;
//       if (i === 0) {
//         writer.write(data, encoding, callback);
//       } else {
//         ok = writer.write(data, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       writer.once('drain', write);
//     }
//   }
//   write();
// }

// addReviews(writeReviews, 'utf-8', () => {
//   writeReviews.end();
// });
