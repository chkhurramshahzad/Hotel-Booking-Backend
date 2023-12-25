const Joi = require("joi");

function validate_add_booking(booking) {
  const schema = {
    booking_number: Joi.string().required().trim(),
    room_info: Joi.array().items(
        Joi.object({
          room_id: Joi.string().required(),
          room_name: Joi.string().required(),
          room_number: Joi.number().required(),
        })
      ),
    direct_booking: Joi.string().required().trim().allow(null, ""),
    indirect_booking: Joi.string().trim().allow(null, ""),
  };
  return Joi.validate(booking, schema);
}

function validate_edit_booking(booking) {
  const schema = {
    booking_number: Joi.string().required().trim(),
    direct_booking: Joi.string().required().trim().allow(null, ""),
    indirect_booking: Joi.string().trim().allow(null, ""),
  };
  return Joi.validate(booking, schema);
}

module.exports = {
  validate_booking,
  validate_edit_booking,
};
