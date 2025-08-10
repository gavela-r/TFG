const mysql = require('mysql2');

const conection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gameShop',
})

module.exports = conection;