/* eslint-disable radix */
/* eslint-disable camelcase */

const { Pool, Client } = require('pg');

const client = new Client({
  host: 'localhost',
  database: 'review',
});

client.connect();


const getRestaurantReviews = (id, callback) => {
  client.query(`SELECT * from reviews INNER JOIN restaurants ON restaurants.r_id = users.user_id WHERE restaurant.r_id = ${id}`, (error, results) => {
    if (error) {
      throw error;
    }
    callback();
  });
};

const createRestaurantReview = (request, response) => {
  const {
    review_id, user_name, city,
    number_of_reviews, profile_picture, vip_status,
    overall_rating, food_rating, service_rating,
    ambience_rating, comment, r_id, date_dined,
  } = request.body;

  client.query('INSERT INTO reviews (review_id, user_name, city, number_of_reviews, profile_picture, vip_status, overall_rating, food_rating, service_rating, ambience_rating, comment, r_id, date_dined) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
    [review_id, user_name, city,
      number_of_reviews, profile_picture, vip_status,
      overall_rating, food_rating, service_rating,
      ambience_rating, comment, r_id, date_dined],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Review added with ID: ${result.review_id}`);
    });
};

const updateRestaurantReview = (request, response) => {
  const id = parseInt(request.params.review_id);
  const {
    user_name, city,
    number_of_reviews, profile_picture, vip_status,
    overall_rating, food_rating, service_rating,
    ambience_rating, comment, r_id, date_dined,
  } = request.body;

  client.query(
    'UPDATE users SET user_name = $1, city = $2, number_of_reviews = $3, profile_picture = $4, vip_status = $5, overall_rating = $6, food_rating = $7, service_rating = $8, ambience_rating = $9, comment = $10, r_id = $11, date_dined = $12 WHERE review_id = $13',
    [user_name, city,
      number_of_reviews, profile_picture, vip_status,
      overall_rating, food_rating, service_rating,
      ambience_rating, comment, r_id, date_dined, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Review modified with ID: ${id}`);
    },
  );
};

const deleteRestaurantReview = (request, response) => {
  const id = parseInt(request.params.review_id);

  client.query('DELETE FROM reviews WHERE review_id = $1', [id], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${result.review_id}`);
  });
};

module.exports = {
  getRestaurantReviews,
  createRestaurantReview,
  updateRestaurantReview,
  deleteRestaurantReview,
};
