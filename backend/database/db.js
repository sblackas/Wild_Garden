const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wildgardendb',
    port: 3306
})

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected to database");

});

module.exports = connection;