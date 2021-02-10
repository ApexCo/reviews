const { Client } = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  password: 'platf0rm2020',
});

db.connect();

module.exports = db;
