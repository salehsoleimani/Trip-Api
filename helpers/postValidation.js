const Joi = require("@hapi/joi");

const validationSchema = Joi.object({
  text: Joi.string().min(10).max(255).required(),
  posted_at: Joi.date(),
});

module.exports = (validationObject) => {
  return validationSchema.validate(validationObject);
};
