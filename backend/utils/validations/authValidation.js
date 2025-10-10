const Joi = require('joi');

const signupSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^(\+91[\-\s]?)?[6-9]\d{9}$/)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must be a valid Indian number (e.g. +91XXXXXXXXXX or 9XXXXXXXXX)'
        }),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match'
    })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = { signupSchema, loginSchema };
