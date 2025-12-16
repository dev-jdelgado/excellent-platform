const mysql = require('mysql2');

const isProduction = process.env.NODE_ENV === 'production';

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Enable SSL ONLY in production
if (isProduction) {
  dbConfig.ssl = {
    rejectUnauthorized: false
  };
}

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('MySQL connected successfully');
  }
});

module.exports = db;
