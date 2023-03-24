const Joi = require("@hapi/joi");

const validationSchema = Joi.object({
  Username: Joi.string().min(6).max(30).required(),
  Password: Joi.string().min(6).max(1024),
  Email: Joi.string().email().min(6).max(255).required(),
  Date: Joi.date(),
});

module.exports = (validationObject) => {
  return validationSchema.validate(validationObject);
};
