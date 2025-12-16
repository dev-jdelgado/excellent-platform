const mysql = require('mysql2');

const isProduction = process.env.NODE_ENV === 'production';

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ...(isProduction && {
    ssl: {
      rejectUnauthorized: false
    }
  }),

  connectTimeout: 20000
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;
