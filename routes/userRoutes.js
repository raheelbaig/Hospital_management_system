const express = require('express');
const UserController = require('../controllers/UserController');
const errorHandler = require('../middlewares/errorHandler');

const router = express.Router();

// GET all doctors
router.get('/doctor/all', UserController.getAllDoctors);


// GET all specialist doctors
router.get('/doctor/specialist/all', UserController.getAllSpecialistDoctors);

// POST register a new doctor
router.post('/doctor/register', upload.single('image'), UserController.registerDoctor);

// POST user login
router.post('/user/login', AuthController.userLogin);



// POST user register
router.post('/user/register', AuthController.userRegister);

// GET all patients
router.get('/patient/all', UserController.getAllPatients);


// DELETE user by ID
router.delete('/delete/id', UserController.deleteUserById);


// Apply error handling middleware

router.use(errorHandler);

module.exports = router;
