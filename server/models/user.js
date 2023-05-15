const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const user = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aadharNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pinCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  loginId: {
    type: DataTypes.UUID,
  },
});

user.associate = (models) => {
  user.belongsTo(models.login, { foreignKey: 'loginId', allowNull: false });
};

module.exports = user;
