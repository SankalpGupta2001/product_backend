const mysql = require('mysql2');

config = {
    host: 'localhost',
    user: 'root',
    password: process.env.password,
    database: process.env.database
  };
   
const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

module.exports = connection;
