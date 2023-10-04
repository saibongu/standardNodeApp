const mysql = require('mysql')
const config = require('../dbconfig.json')

var connection = mysql.createConnection({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE
});

connection.connect(function (err) {
    if (!err) {
        console.log('database is connected');
    }
    else {
        console.log('database is not connected ' + err.message);
    }
})

module.exports = connection