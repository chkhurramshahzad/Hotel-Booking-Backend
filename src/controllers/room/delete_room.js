const { delete_room } = require("../../services/room");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const delete_room = async (req, res) => {
  try {
    const { error, error_message, data } = await delete_room(req.params.id);

    if (error) {
      return res.status(400).json({
        code: 400,
        message: error_message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Room Deleted Successfully",
      room: data.room,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = delete_room;
