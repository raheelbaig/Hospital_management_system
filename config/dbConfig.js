const { Pool } = require('pg');

const pool = new Pool({
  user: 'ammar',
  host: 'localhost',
  database: 'hospital',
  password: 'test1234',
  port: 5432,
});

module.exports = pool;
