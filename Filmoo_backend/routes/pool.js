var mysql = require("mysql")
var pool = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    port: 3306,
    user: 'sql12777181',
    password: '6GB6UwB9sq',
    database: 'sql12777181',
    multipleStatements: true,
    connectionLimit: 100

})
module.exports = pool