const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Check if it's a Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(error => ({
      field: error.path,
      message: error.message,
    }));
    return res.status(400).json({ errors });
  }

  // Check if it's a Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0].path;
    const message = `${field} must be unique`;
    return res.status(400).json({ error: message });
  }

  // Handle other types of errors
  res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
