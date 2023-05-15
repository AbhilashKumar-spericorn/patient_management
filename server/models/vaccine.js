const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const vaccine = sequelize.define('vaccine', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = vaccine;
