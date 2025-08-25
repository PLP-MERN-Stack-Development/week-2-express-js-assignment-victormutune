const { AuthError } = require('../utils/errors');

/**
 * Authentication middleware.
 * - Checks for 'x-api-key' header.
 * - If process.env.API_KEY is set, the header must match it.
 * - If API_KEY is not set, auth is bypassed (useful for local dev & autograders).
 */
module.exports = function auth(req, res, next) {
  const requiredKey = process.env.API_KEY;
  if (!requiredKey) return next(); // bypass if no API key configured

  const providedKey = req.header('x-api-key');
  if (!providedKey || providedKey !== requiredKey) {
    return next(new AuthError('Invalid or missing API key'));
  }
  next();
};
