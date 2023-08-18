const mysql = require('mysql')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "hospitalapplication"
});

connection.connect(function (err) {
    if (!err) {
        console.log('database is connected');
    }
    else {
        console.log('database is not connected ' + err.message);
    }
})

module.exports=connection