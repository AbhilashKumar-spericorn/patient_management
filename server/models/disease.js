const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const disease = sequelize.define('disease', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remarks: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
  },
});

disease.associate = (models) => {
  disease.belongsTo(models.user, { foreignKey: 'userId', allowNull: false });
};

module.exports = disease;
