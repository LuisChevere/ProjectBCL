const Sequelize = require('sequelize');
const mysql = require('mysql2');

//require('dotenv').config();

// create connection to our db
const sequelize = mysql.createConnection(process.env.JAWSDB_URL);

module.exports = sequelize;
