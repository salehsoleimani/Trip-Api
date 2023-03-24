const Joi = require("joi");

function validateUser(user) {
  const schema = Joi.object().keys({
    username: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).required(),
  });
  return Joi.validate(user, schema);
}

exports.validate = validateUser;
