require('dotenv').config();
const mysql = require('mysql2/promise'); // Use promise-based MySQL

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
    connectionLimit: 2, // reduce connections per pool
    queueLimit: 0
  });

} else {
  console.log('🔹 Using existing MySQL pool');
}

pool = global._mysqlPool;

module.exports = pool;
