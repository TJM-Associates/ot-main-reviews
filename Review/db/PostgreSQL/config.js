const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'michaelkim',
  host: '54.219.177.6',
  database: 'review',
  password: 'password',
  port: 5432,
});

module.exports = pool;
