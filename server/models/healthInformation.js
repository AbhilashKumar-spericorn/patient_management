const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const healthInformation = sequelize.define('healthInformation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  blood: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  height: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'others'),
    defaultValue: 'male',
    allowNull: true,
  },
  userId: {
    type: DataTypes.UUID,
  },
});

healthInformation.associate = (models) => {
  healthInformation.belongsTo(models.user, {
    foreignKey: 'userId',
    allowNull: false,
  });
};

module.exports = healthInformation;
