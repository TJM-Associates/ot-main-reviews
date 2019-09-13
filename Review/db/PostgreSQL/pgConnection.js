/* eslint-disable no-console */
const pg = require('pg');

const client = new pg.Client({
  user: 'michaelkim',
  host: 'localhost',
  database: 'review',
  password: 'password',
  port: 5432,
});

//check connection 
client.connect((err) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log('connected to node-gres');
  }
});


module.exports = { client };
