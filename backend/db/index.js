const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dateStrings: 'date'
});

module.exports = pool;