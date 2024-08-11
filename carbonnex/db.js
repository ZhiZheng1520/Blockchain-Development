// db.js
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Use process.cwd() to get the current working directory and construct the certificate path
const certPath = path.resolve(process.cwd(), process.env.PG_SSL_CERT_PATH);
console.log('Current Working Directory:', process.cwd());
console.log('Resolved Certificate Path:', certPath);

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(certPath).toString(),
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
