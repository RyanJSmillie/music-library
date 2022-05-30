// utils/create-database.js
// require the promise version of mysql2
const mysql = require('mysql2');

// require path to handle file paths
const path = require('path');

// load environment variables from env files
require('dotenv').config({
  path: path.join(__dirname, '../.env.test'),
});

// destructure environment variables from process.env 
const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

// connects with the sql database
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
  });
  
  // runs the query to drop the database
  connection.query(`DROP DATABASE ${DB_NAME}`, () => connection.end());