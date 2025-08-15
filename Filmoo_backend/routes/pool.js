require('dotenv').config();
const mysql = require('mysql2'); // use callback-based client

// ✅ Only one pool per serverless instance
let pool;

if (!global._mysqlPool) {
  global._mysqlPool = mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT,
    waitForConnections: true,
    connectionLimit: 2, // reduce connections per serverless instance
    queueLimit: 0
  });

  console.log('🌟 Created new MySQL pool');
} else {
  console.log('🔹 Using existing MySQL pool');
}

pool = global._mysqlPool;

module.exports = pool;
