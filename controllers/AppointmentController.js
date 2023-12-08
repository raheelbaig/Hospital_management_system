const { Appointment, User } = require('../models');

exports.getAppointmentById = async (req, res, next) => {
  try {
    const appointmentId = req.query.appointmentId;

    if (!appointmentId) {
      return res.status(400).json({ error: 'Appointment ID is required' });
    }

    const appointment = await Appointment.findByPk(appointmentId, {
      include: [
        {
          model: User,
          as: 'patient',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
        {
          model: User,
          as: 'doctor',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
      ],
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (err) {
    next(err);
  }
};

exports.getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: User,
          as: 'patient',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
        {
          model: User,
          as: 'doctor',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
      ],
    });

    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

exports.getAppointmentsByPatientId = async (req, res, next) => {
  try {
    const patientId = req.query.patientId;

    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    const appointments = await Appointment.findAll({
      where: { patientId },
      include: [
        {
          model: User,
          as: 'patient',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
        {
          model: User,
          as: 'doctor',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
      ],
    });

    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

exports.getAppointmentsByDoctorId = async (req, res, next) => {
  try {
    const doctorId = req.query.doctorId;

    if (!doctorId) {
      return res.status(400).json({ error: 'Doctor ID is required' });
    }

    const appointments = await Appointment.findAll({
      where: { doctorId },
      include: [
        {
          model: User,
          as: 'patient',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
        {
          model: User,
          as: 'doctor',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
      ],
    });

    res.json(appointments);
  } catch (err) {
    next(err);
  }
};



exports.createAppointmentForPatient = async (req, res, next) => {
  try {
    const { patientId, problem } = req.body;

    if (!patientId || !problem) {
      return res.status(400).json({ error: 'Patient ID and problem are required' });
    }

    // You may add additional validation or business logic here

    // Fetch the patient to check the role
    const patient = await User.findByPk(patientId);

    if (!patient || patient.role !== 'patient') {
      return res.status(400).json({ error: 'Invalid patient ID or patient role' });
    }

    const appointment = await Appointment.create({
      patientId,
      problem,
      doctorId: null, // Set doctorId to null during appointment creation
    });

    // Fetch additional details about the patient and doctor
    const createdAppointment = await Appointment.findByPk(appointment.id, {
      include: [
        {
          model: User,
          as: 'patient',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
        {
          model: User,
          as: 'doctor',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
      ],
    });

    res.status(201).json(createdAppointment);
  } catch (err) {
    next(err);
  }
};


exports.assignDoctorToAppointment = async (req, res, next) => {
  try {
    const { appointmentId, doctorId } = req.body;

    if (!appointmentId || !doctorId) {
      return res.status(400).json({ error: 'Appointment ID and doctor ID are required' });
    }

    // You may add additional validation or business logic here

    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Fetch the doctor to check the role
    const doctor = await User.findByPk(doctorId);

    if (!doctor || doctor.role !== 'doctor') {
      return res.status(400).json({ error: 'Invalid doctor ID or doctor role' });
    }

    // Update the appointment with the assigned doctor
    await appointment.update({ doctorId });

    // Fetch additional details about the patient and doctor
    const updatedAppointment = await Appointment.findByPk(appointmentId, {
      include: [
        {
          model: User,
          as: 'patient',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
        {
          model: User,
          as: 'doctor',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
      ],
    });

    res.json(updatedAppointment);
  } catch (err) {
    next(err);
  }
};
// Apply error handling middleware

exports.updateAppointmentByDoctor = async (req, res, next) => {
  try {
    const { appointmentId, price, prescription, status } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ error: 'Appointment ID is required' });
    }

    // You may add additional validation or business logic here

    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Update the appointment with the provided data
    await appointment.update({
      price: price !== undefined ? price : appointment.price,
      prescription: prescription !== undefined ? prescription : appointment.prescription,
      status: status !== undefined ? status : appointment.status,
    });

    // Fetch additional details about the patient and doctor
    const updatedAppointment = await Appointment.findByPk(appointmentId, {
      include: [
        {
          model: User,
          as: 'patient',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
        {
          model: User,
          as: 'doctor',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
      ],
    });

    res.json(updatedAppointment);
  } catch (err) {
    next(err);
  }
};

exports.cancelAppointmentByPatient = async (req, res, next) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ error: 'Appointment ID is required' });
    }

    // You may add additional validation or business logic here

    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Only allow the patient who made the appointment to cancel it
    // You may add additional checks based on your authentication/authorization system
    if (appointment.patientId !== req.user.id || req.user.role !== 'patient') {
      return res.status(403).json({ error: 'Unauthorized to cancel this appointment' });
    }

    // Update the appointment status to "Cancelled"
    await appointment.update({ status: 'Cancelled' });

    // Fetch additional details about the patient and doctor
    const cancelledAppointment = await Appointment.findByPk(appointmentId, {
      include: [
        {
          model: User,
          as: 'patient',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
        {
          model: User,
          as: 'doctor',
          attributes: ['id', 'firstName', 'lastName', 'emailId'],
        },
      ],
    });

    res.json(cancelledAppointment);
  } catch (err) {
    next(err);
  }
};


