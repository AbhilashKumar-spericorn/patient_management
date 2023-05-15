const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const consultation = sequelize.define('consultation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'consulted'),
    defaultValue: 'pending',
    allowNull: true,
  },
  userId: {
    type: DataTypes.UUID,
  },
  transactionId: {
    type: DataTypes.UUID,
  },
  doctorId: {
    type: DataTypes.UUID,
  },
  hospitalId: {
    type: DataTypes.UUID,
  },
  departmentId: {
    type: DataTypes.UUID,
  },
});

consultation.associate = (models) => {
  consultation.belongsTo(models.user, {
    foreignKey: 'userId',
    allowNull: false,
  });
  consultation.belongsTo(models.doctor, {
    foreignKey: 'doctorId',
    allowNull: false,
  });
  consultation.belongsTo(models.hospital, {
    foreignKey: 'hospitalId',
    allowNull: false,
  });
  consultation.belongsTo(models.department, {
    foreignKey: 'departmentId',
    allowNull: false,
  });
  consultation.belongsTo(models.transaction, {
    foreignKey: 'transactionId',
    allowNull: false,
  });
};

module.exports = consultation;
