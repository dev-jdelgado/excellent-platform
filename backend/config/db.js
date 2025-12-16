const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,       // nozomi.proxy.rlwy.net
  port: process.env.DB_PORT,       // 16266
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    rejectUnauthorized: false
  },

  connectTimeout: 20000
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('Connected to Railway MySQL');
  }
});

module.exports = db;
