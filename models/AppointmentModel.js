const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

class Appointment extends Model {}

Appointment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  problem: {
    type: DataTypes.STRING,
  },
  prescription: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  status: {
    type: DataTypes.STRING,
  },
  appointmentDate: {
    type: DataTypes.DATE,
  },
  date: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'Appointment',
});

module.exports = Appointment;
