/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const faker = require('faker');
// eslint-disable-next-line prefer-const
const fs = require('fs');


// ================ WRITE DATA  =====================

const writeRestaurants = fs.createWriteStream('restaurants.csv');
writeRestaurants.write('r_id,restaurant_name\n', 'utf8');

function writeFourHundredThousandRestaurants(writer, encoding, callback) {
  let i = 400000;
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
      if (i % 100000 === 0) {
        console.log(i);
      }
    }
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
}

writeFourHundredThousandRestaurants(writeRestaurants, 'utf-8', () => {
  writeRestaurants.end();
});
