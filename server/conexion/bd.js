const mysql = require('mysql2');

const conection =  mysql.createConnection({
    host: 'mysql_db',
    user: 'root',
    password: 'root',
    database: 'gameShop',
})

module.exports = conection;