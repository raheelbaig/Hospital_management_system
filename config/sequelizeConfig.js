const { Sequelize } = require('sequelize');
const dbConfig = require('./dbConfig'); // Assuming the name of your PostgreSQL connection configuration file

const sequelize = new Sequelize({
  ...dbConfig,
  dialect: 'postgres', // Specify the dialect explicitly if not already specified in dbConfig
});

module.exports = sequelize;
