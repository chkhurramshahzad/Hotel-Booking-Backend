const {
  validate_booking,
} = require("../../utils/validation/validate_booking");
const { add_new_booking } = require("../../services/booking");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const create_booking = async (req, res) => {
  try {
    //validate Request Body
    try {
      await validate_booking(req.body);
    } catch (e) {
      return res.status(400).json({
        code: 400,
        message: e.details[0].message.replace(/\"/g, ""),
      });
    }

    const { error, error_message, data } = await add_new_booking(
      req.body
    );

    if (error) {
      return res.status(400).json({
        code: 400,
        message: error_message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Room Added Successfully",
      room: data,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = create_booking;
