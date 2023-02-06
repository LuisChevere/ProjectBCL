const Sequelize = require('sequelize');

//require('dotenv').config();

// create connection to our db
const sequelize = Sequelize.createConnection(process.env.JAWSDB_URL);

module.exports = sequelize;
