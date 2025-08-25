const { ValidationError } = require('../utils/errors');

const isString = (v) => typeof v === 'string' && v.trim().length > 0;
const isBoolean = (v) => typeof v === 'boolean';
const isNumber = (v) => typeof v === 'number' && !Number.isNaN(v);

/**
 * Validate product for creation (all required)
 */
function validateCreate(req, res, next) {
  const { name, description, price, category, inStock } = req.body;

  const errors = [];
  if (!isString(name)) errors.push('name must be a non-empty string');
  if (!isString(description)) errors.push('description must be a non-empty string');
  if (!isNumber(price) || price < 0) errors.push('price must be a non-negative number');
  if (!isString(category)) errors.push('category must be a non-empty string');
  if (!isBoolean(inStock)) errors.push('inStock must be a boolean');

  if (errors.length) return next(new ValidationError(errors.join(', ')));
  next();
}

/**
 * Validate product for update (partial allowed)
 */
function validateUpdate(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  const errors = [];

  if (name !== undefined && !isString(name)) errors.push('name must be a non-empty string');
  if (description !== undefined && !isString(description)) errors.push('description must be a non-empty string');
  if (price !== undefined && (!isNumber(price) || price < 0)) errors.push('price must be a non-negative number');
  if (category !== undefined && !isString(category)) errors.push('category must be a non-empty string');
  if (inStock !== undefined && !isBoolean(inStock)) errors.push('inStock must be a boolean');

  if (errors.length) return next(new ValidationError(errors.join(', ')));
  next();
}

module.exports = { validateCreate, validateUpdate };
