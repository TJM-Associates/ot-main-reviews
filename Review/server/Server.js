/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/order
// const db = require('../db/dbConnection.js');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');
const pool = require('../db/PostgreSQL/config.js');


const app = express();
const port = 3001;

app.use(compression());
app.use(morgan('tiny'));
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/build/client', expressStaticGzip('build/client', {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders(res, path) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  },
}));

app.use('/', express.static('loader'));
app.use('/restaurants/:id', express.static('public'));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App listening on port ${port}!`));

// app.get('/api/restaurants/:id/reviews', (req, res) => {
//   // console.log(req.params.id);
// eslint-disable-next-line max-len
//   const queryString = 'SELECT * from reviews JOIN users ON (reviews.r_id = ? AND reviews.u_id = users.user_id)';
//   db.connection.query(queryString, [req.query.id], (error, results) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(results);
//     }
//   });
// });

app.get('/api/restaurants/:id/reviews', (req, res) => {
  // console.log(req.params.id.substring(1));
  const id = req.params.id.substring(1);
  pool.query('SELECT * FROM reviews WHERE r_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.send(results.rows);
    }
  });
});

app.post('/api/restaurants/:id/reviews', (req, res) => {
  const id = req.params.id.substring(1);
  const {
    review_id, user_name, city,
    number_of_reviews, profile_picture, vip_status,
    overall_rating, food_rating, service_rating,
    ambience_rating, comment, r_id, date_dined } = req.body;
  console.log(req.body);
  pool.query('INSERT INTO reviews (review_id, user_name, city, number_of_reviews, profile_picture, vip_status, overall_rating, food_rating, service_rating, ambience_rating, comment, r_id, date_dined) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)'),
  [review_id, user_name, city,
    number_of_reviews, profile_picture, vip_status,
    overall_rating, food_rating, service_rating,
    ambience_rating, comment, r_id, date_dined],
  (error, result) => {
    if (error) {
      throw error;
    } else {
      res.status(200).send(`Review added with ID: ${result.review_id}`);
    }
  };
});

app.put('/api/restaurants/:id/reviews', (req, res) => {
  const id = req.params.id.substring(1);
  const {
    user_name, city,
    number_of_reviews, profile_picture, vip_status,
    overall_rating, food_rating, service_rating,
    ambience_rating, comment, r_id, date_dined,
  } = req.body;

  pool.query(
    'UPDATE users SET user_name = $1, city = $2, number_of_reviews = $3, profile_picture = $4, vip_status = $5, overall_rating = $6, food_rating = $7, service_rating = $8, ambience_rating = $9, comment = $10, r_id = $11, date_dined = $12 WHERE review_id = $13',
    [user_name, city,
      number_of_reviews, profile_picture, vip_status,
      overall_rating, food_rating, service_rating,
      ambience_rating, comment, r_id, date_dined, id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.status(200).send(`Review modified with ID: ${id}`);
      }
    },
  );
});

app.delete('/api/restaurants/:id/reviews', (req, res) => {
  const id = req.params.id.substring(1);
  pool.query('DELETE FROM reviews WHERE review_id = $1', [id], (error, result) => {
    if (error) {
      throw error;
    } else {
      res.status(200).send(`User deleted with ID: ${result.review_id}`);
    }
  });
});
