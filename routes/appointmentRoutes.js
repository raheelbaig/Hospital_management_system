const express = require('express');
const AppointmentController = require('../controllers/AppointmentController');
const errorHandler = require('../middlewares/errorHandler');

const router = express.Router();

// GET specific appointment by ID
router.get('/id', AppointmentController.getAppointmentById);


// GET all appointments
router.get('/all', AppointmentController.getAllAppointments);

// Apply error handling middleware

// GET appointments by patient ID
router.get('/patient/id', AppointmentController.getAppointmentsByPatientId);

// GET appointments by doctor ID
router.get('/doctor/id', AppointmentController.getAppointmentsByDoctorId);


// POST create appointment for patient
router.post('/patient/add', AppointmentController.createAppointmentForPatient);

// POST assign doctor to appointment
router.post('/admin/assign/doctor', AppointmentController.assignDoctorToAppointment);

// POST update appointment by doctor
router.post('/doctor/update', AppointmentController.updateAppointmentByDoctor);

// POST cancel appointment by patient
router.post('/patient/update', AppointmentController.cancelAppointmentByPatient);

router.use(errorHandler);

module.exports = router;
