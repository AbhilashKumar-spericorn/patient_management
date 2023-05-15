const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const transaction = sequelize.define('transaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  userId: {
    type: DataTypes.UUID,
  },
  appointmentType: {
    type: DataTypes.ENUM('vaccination', 'consultation'),
    defaultValue: 'consultation',
    allowNull: true,
  },
});

module.exports = transaction;
