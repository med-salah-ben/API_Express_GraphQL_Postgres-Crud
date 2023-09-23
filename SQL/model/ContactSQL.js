const { sq } = require("../configSQL/db");
const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");

const ContactsSQLs = sq.define("contactsSQL", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique:true
  },

  name: {
    type: DataTypes.STRING,
  },

  phone: {
    type: DataTypes.STRING,
  },

  // employed: {
  //   type: DataTypes.BOOLEAN,
  //   defaultValue: false,
  // },
});

ContactsSQLs.sync().then(() => {
  console.log("Contacts Model synced");
});

module.exports = ContactsSQLs;
