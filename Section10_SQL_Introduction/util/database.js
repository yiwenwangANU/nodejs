const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'node-complete',
    user: 'root',
    password: 'lanpoiris'
})

module.exports = pool.promise();