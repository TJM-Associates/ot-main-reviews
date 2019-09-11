const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'reviewDB',
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', (error, results) => {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


module.exports.connection = connection;
