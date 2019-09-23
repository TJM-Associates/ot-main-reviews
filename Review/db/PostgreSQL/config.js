const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'michaelkim',
  host: 'localhost',
  database: 'review',
  password: 'password',
  port: 5432,
});

module.exports = pool;
