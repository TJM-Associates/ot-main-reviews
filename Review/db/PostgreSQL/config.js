/* eslint-disable no-unused-vars */
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'mike',
  host: '54.219.177.6',
  database: 'review',
  port: 5432,
});

module.exports = pool;
