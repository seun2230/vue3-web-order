const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

module.exports = pool;