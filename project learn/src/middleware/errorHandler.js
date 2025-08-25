const { AppError, NotFoundError } = require('../utils/errors');

function notFoundHandler(req, res, next) {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
}

function errorHandler(err, req, res, next) {
  if (!(err instanceof AppError)) {
    console.error('Unexpected error:', err);
    err = new AppError('Internal server error', 500);
  }
  res.status(err.statusCode).json({
    status: 'error',
    message: err.message,
  });
}

module.exports = { notFoundHandler, errorHandler };
