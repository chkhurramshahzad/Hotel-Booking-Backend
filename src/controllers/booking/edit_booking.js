const {
  validate_edit_booking,
} = require("../../utils/validation/validate_booking");
const { edit_booking } = require("../../services/booking");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const path = require("path");

const edit_booking = async (req, res) => {
  try {
    //validate Request Body
    try {
      await validate_edit_booking(req.body);
    } catch (e) {
      return res
        .status(400)
        .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
    }
   

    const { error, error_message, data } = await edit_booking(
      req.body,
      req.params.id,
    );

    if (error) {
      return res.status(400).json({
        code: 400,
        message: error_message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Booking Updated successfully",
      booking: data,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = edit_booking;
