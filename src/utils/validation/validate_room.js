const Joi = require("joi");

function validate_room(room) {
  const schema = {
    room_name: Joi.string().required().trim(),
    room_number: Joi.string().required().trim(),
    room_available: Joi.boolean(),
  };
  return Joi.validate(room, schema);
}

function validate_edit_room(room) {
  const schema = {
    room_name: Joi.string().required().trim(),
    room_number: Joi.string().required().trim(),
    room_available: Joi.boolean(),
  };
  return Joi.validate(room, schema);
}

module.exports = {
  validate_room,
  validate_edit_room,
};
