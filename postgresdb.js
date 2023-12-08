const { Pool } = require('pg');

const pool = new Pool({
  user: 'ammar',
  host: 'localhost',
  database: 'hospital',
  password: 'test1234',
  port: 5432,
});

// Create 'users' table ALTER DATABASE hospital OWNER TO ammar; 
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    age INT,
    sex VARCHAR(10),
    bloodGroup VARCHAR(10),
    emailId VARCHAR(255),
    contact VARCHAR(15),
    street VARCHAR(255),
    city VARCHAR(255),
    pincode INT,
    password VARCHAR(255),
    role VARCHAR(20),
    specialist VARCHAR(255),
    status VARCHAR(20),
    doctorImage VARCHAR(255),
    experience VARCHAR(255)
  );
`, (err, result) => {
  if (err) {
    console.error('Error creating users table:', err);
  } else {
    console.log('Users table created successfully');
  }
});;


// Create 'appointments' table
pool.query(`
  CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    patientId INT REFERENCES users(id),
    doctorId INT REFERENCES users(id),
    problem VARCHAR(255),
    prescription TEXT,
    price FLOAT,
    status VARCHAR(20),
    appointmentDate TIMESTAMPTZ,
    date TIMESTAMPTZ
  );
`, (err, result) => {
  if (err) {
    console.error('Error creating appointments table:', err);
  } else {
    console.log('Appointments table created successfully');
  }

  // Close the pool
  pool.end();
});
 

// two tables has been created
