const Joi = require('joi');

const checkoutSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\+91[\-\s]?)?[6-9]\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be a valid Indian number (e.g. +91XXXXXXXXXX or 9XXXXXXXXX)'
    }),
  address1: Joi.string().min(10).required(),
  state: Joi.string().required(),
  district: Joi.string().required(),
  pinCode: Joi.string().pattern(/^[0-9]{5,10}$/).required(),
  country: Joi.string().required()
});

module.exports = { checkoutSchema };
