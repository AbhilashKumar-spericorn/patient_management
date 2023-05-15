const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const department = sequelize.define('department', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = department;
