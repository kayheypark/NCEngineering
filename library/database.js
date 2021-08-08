// MySQL
const mysql = require('mysql');
global.pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nceng'
});