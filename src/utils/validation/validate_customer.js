const Joi = require("joi");

function validate_customer(user) {
  const schema = {
    first_name: Joi.string().required().trim(),
    last_name: Joi.string().required().trim(),
    address: Joi.string().trim().allow(null, ""),
    email: Joi.string().required().email({ minDomainAtoms: 2 }).trim(),
    password: Joi.string().min(5).max(255).required().trim(),
    contact_number: Joi.string().trim().allow(null, ""),
  };
  return Joi.validate(user, schema);
}

function validate_edit_customer(user) {
  const schema = {
    first_name: Joi.string().required().trim(),
    last_name: Joi.string().required().trim(),
    address: Joi.string().trim().allow(null, ""),
    contact_number: Joi.string().trim().allow(null, ""),
    profile_image: Joi.string().trim().allow(null, ""),
    email: Joi.string().email({ minDomainAtoms: 2 }).trim().allow(null, ""),
  };
  return Joi.validate(user, schema);
}

module.exports = {
  validate_customer,
  validate_edit_customer,
};
