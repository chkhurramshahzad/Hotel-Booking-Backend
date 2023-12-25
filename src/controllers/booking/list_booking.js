const { list_booking } = require("../../services/booking");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const list_booking = async (req, res) => {
  try {
    const { error, error_message, data } = await list_booking();

    if (error) {
      return res.status(400).json({
        code: 400,
        message: error_message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Booking List",
      employeeuser: data.booking,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = list_booking;
