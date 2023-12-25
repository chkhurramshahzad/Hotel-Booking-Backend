const { detail_booking } = require("../../services/booking");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const detail_booking = async (req, res) => {
  try {
    const { error, error_message, data } = await detail_booking(
      req.params.id
    );

    if (error) {
      return res.status(400).json({
        code: 400,
        message: error_message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Booking Details",
      booking: data.booking,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = detail_booking;
