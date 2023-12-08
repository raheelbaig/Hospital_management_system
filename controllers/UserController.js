// UserController.js
const { User } = require('../models');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename for each uploaded file
  },
});

exports.getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await User.findAll({
      where: { role: 'doctor' },
      attributes: ['id', 'firstName', 'lastName', 'emailId'],
    });

    res.json(doctors);
  } catch (err) {
    next(err);
  }
};

exports.getAllSpecialistDoctors = async (req, res, next) => {
  try {
    const specialistDoctors = await User.findAll({
      where: {
        role: 'doctor',
        specialist: { [User.sequelize.Op.not]: null },
      },
      attributes: ['id', 'firstName', 'lastName', 'emailId', 'specialist'],
    });

    res.json(specialistDoctors);
  } catch (err) {
    next(err);
  }
};

const upload = multer({ storage: storage });

exports.registerDoctor = async (req, res, next) => {
  try {
    // Extract fields from the request body
    const {
      firstName,
      lastName,
      emailId,
      password,
      contact,
      street,
      city,
      pincode,
      role,
      age,
      sex,
      specialist,
      experience,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !emailId || !password || !contact || !street || !city || !pincode || !role || !age || !sex) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Extract the filename of the uploaded image from the request
    const imagePath = req.file ? req.file.path : null;

    // Create a new doctor
    const doctor = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      contact,
      street,
      city,
      pincode,
      role,
      age,
      sex,
      specialist,
      experience,
      doctorImage: imagePath,
    });

    // Send the created doctor as a response
    res.status(201).json(doctor);
  } catch (err) {
    next(err);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create a JWT token for authentication
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send the user data and token as a response
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    next(err);
  }
};


exports.userRegister = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      emailId,
      password,
      contact,
      street,
      city,
      pincode,
      role = 'patient', // Default role is set to 'patient'
      age,
      sex,
      bloodGroup,
    } = req.body;

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ where: { emailId } });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      contact,
      street,
      city,
      pincode,
      role,
      age,
      sex,
      bloodGroup,
    });

    res.status(201).json({
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.emailId,
      role: newUser.role,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await User.findAll({
      where: { role: 'patient' },
      attributes: ['id', 'firstName', 'lastName', 'emailId', 'contact'],
    });

    res.json(patients);
  } catch (err) {
    next(err);
  }
};


exports.deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    await user.destroy();

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
