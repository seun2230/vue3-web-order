const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123478',
  database: 'test_db'
});

module.exports = pool;