require('dotenv').config();
const mysql = require('mysql2');

// ✅ Prevent multiple pools in Vercel serverless
let pool;
if (!global._mysqlPool) {
  global._mysqlPool = mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT,
    waitForConnections: true,
    connectionLimit: 5, // match Clever Cloud plan
    queueLimit: 0
  });
}
pool = global._mysqlPool;

module.exports = pool;
