/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const fs = require('fs');
const faker = require('faker');

const cities = ['San Francisco', 'Oakland', 'Berkeley', 'Daly City', 'San Bruno', 'San Jose'];
const randomCityPicker = () => {
  const randomCity = Math.floor(Math.random() * 6);
  return cities[randomCity];
};

const nouns = ['car', 'horse', 'apple', 'person', 'chimp'];
const adjectives = ['red', 'fast', 'lonely', 'hungry', 'insane'];

const getQuote = () => {
  const randomNounIndex = Math.floor(Math.random() * nouns.length);
  const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
  const retVal = `The ${nouns[randomNounIndex]} is ${adjectives[randomAdjectiveIndex]}.`;
  return retVal;
};

const d = new Date();
const curr_date = d.getDate();
const curr_month = d.getMonth() + 1; // Months are zero based
const curr_year = d.getFullYear();
const sameDate = `${curr_year}-${curr_month}-${curr_date}`;

console.log(typeof sameDate);

// function randomDate(start, end) {
//   // eslint-disable-next-line max-len
//   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0,10);
// }
// Writing Reviews
const writeReviews = fs.createWriteStream('reviews.csv');
// eslint-disable-next-line max-len
// writeReviews.write('user_name,location, number_of_reviews,profile_picture,vip_status,overall_rating,food_rating,service_rating,ambience_rating,comment,r_id,date_dined\n', 'utf8');
writeReviews.write('user_name, location, number_of_reviews, profilePicture, vipStatus,overall_rating,food_rating,service_rating,ambience_rating,comment,r_id,date_dined\n', 'utf8');
function writeReviews250mil(writer, encoding, callback) {
  let i = 250000000; // two fifty million
  let id = 1;
  function write() {
    let ok = true;
    while (i > 0 && ok) {
      i -= 1;
      const user_name = faker.internet.userName();
      const location = randomCityPicker();
      const number_of_reviews = Math.floor(Math.random() * 200) + 1;
      const profilePicture = faker.image.avatar();
      const vipStatus = faker.random.boolean();
      const overall_rating = Math.floor(Math.random() * 5) + 1;
      const food_rating = Math.floor(Math.random() * 5) + 1;
      const service_rating = Math.floor(Math.random() * 5) + 1;
      const ambience_rating = Math.floor(Math.random() * 5) + 1;
      const comment = getQuote();
      const r_id = id;
      const date_dined = sameDate;
      const data = `${user_name}, ${location},${number_of_reviews}, ${profilePicture},${vipStatus},${overall_rating},${food_rating},${service_rating},${ambience_rating},${comment},${r_id}, ${date_dined}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
      // divde by 25 for 25 reviews per restaurant
      if (i % 25 === 0) {
        id++;
      }
      if (i % 100000 === 0) {
        console.log(i);
      }
    }
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}


writeReviews250mil(writeReviews, 'utf-8', () => {
  writeReviews.end();
});
