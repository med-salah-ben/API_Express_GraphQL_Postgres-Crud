const { sq } = require("../configSQL/db");
const { DataTypes } = require("sequelize");

const ContactsSQLs = sq.define("contactsSQL", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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