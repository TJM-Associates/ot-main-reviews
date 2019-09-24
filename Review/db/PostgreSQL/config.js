/* eslint-disable no-unused-vars */
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: null,
  host: '54.219.177.6',
  database: 'review',
});

module.exports = pool;
