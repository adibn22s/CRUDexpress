const mysql = require('mysql');

const dbase = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'capstone',
});

module.exports = dbase;
