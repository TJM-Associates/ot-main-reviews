/* eslint-disable no-unused-vars */
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '54.219.177.6',
  database: 'review',
  password: null,
});

module.exports = pool;
