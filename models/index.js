const User = require('./UserModel');
const Appointment = require('./AppointmentModel');

// Define associations between models if needed
User.hasMany(Appointment, { foreignKey: 'patientId' });
User.hasMany(Appointment, { foreignKey: 'doctorId' });

module.exports = {
  User,
  Appointment,
};
