const { delail_room } = require("../../services/room");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const detail_room = async (req, res) => {
  try {
    const { error, error_message, data } = await delail_room(
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
      message: "Room Details",
      room: data.room,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = detail_room;
