const { Sequelize } = require("sequelize");
require("dotenv").config({path:"../../.env"})

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.DB_PASSWORD, {
  host: "localhost",
  dialect:"postgres"
});

const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

  module.exports = { sq: sequelize, testDbConnection };