const {
  validate_room,
} = require("../../utils/validation/validate_room");
const { edit_room } = require("../../services/room");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const { CTAEGORY_IMAGE_EXTENSIONS } = require("../../utils/constants");
const path = require("path");

const edit_room = async (req, res) => {
  try {
    //validate Request Body
    try {
      await validate_room(req.body);
    } catch (e) {
      return res
        .status(400)
        .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
    }
   
    const { error, error_message, data } = await edit_room(
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
      message: "Room Updated successfully",
      room: data,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = edit_room;
