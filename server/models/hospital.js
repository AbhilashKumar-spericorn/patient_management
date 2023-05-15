const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config//sequelize-config');

const hospital = sequelize.define('hospital', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hospitalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = hospital;
