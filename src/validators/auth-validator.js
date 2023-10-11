const Joi = require("joi");

const registerSchema = Joi.object({
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  phone:Joi.string().pattern(/^[0-9]{10}$/).required(),
  password :Joi.string()
  .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,30}$/)
  .trim()
  .required(),
  confirmPassword : Joi.string().valid(Joi.ref('password')).trim().required().strip(),
  role:Joi.string(),
  address:Joi.string().trim(),
  subdistrict:Joi.string().trim(),
  district:Joi.string().trim(),
  province:Joi.string().trim(),
  postcode:Joi.string().trim().pattern(/^[0-9]{5}$/)
});

exports.registerSchema = registerSchema


const loginSchema = Joi.object({
  email:Joi.string().required(),
  password:Joi.string().required()
})

exports.loginSchema = loginSchema


const checkUserIdSchema = Joi.object({
  userId:Joi.number().integer().required().positive()
})

exports.checkUserIdSchema =checkUserIdSchema