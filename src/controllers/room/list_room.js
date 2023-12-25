const { list_room } = require("../../services/room");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const list_room = async (req, res) => {
  try {
    const { error, error_message, data } = await list_room();

    if (error) {
      return res.status(400).json({
        code: 400,
        message: error_message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Room List",
      employeeuser: data.employee,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = list_room;
