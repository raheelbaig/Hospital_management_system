const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  sex: {
    type: DataTypes.STRING,
  },
  bloodGroup: {
    type: DataTypes.STRING,
  },
  emailId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  contact: {
    type: DataTypes.STRING,
  },
  street: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  pincode: {
    type: DataTypes.INTEGER,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
  },
  specialist: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  doctorImage: {
    type: DataTypes.STRING,
  },
  experience: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;
