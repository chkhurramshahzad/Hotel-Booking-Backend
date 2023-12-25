const {
  validate_edit_customer,
} = require("../../utils/validation/validate_customer");
const { edit_customer } = require("../../services/customer");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const path = require("path");
const { CUSTOMER_IMAGE_EXTENSIONS } = require("../../utils/constants");


const edit_customer = async (req, res) => {
  try {
    //validate Request Body
    try {
      await validate_edit_customer(req.body);
    } catch (e) {
      return res
        .status(400)
        .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
    }
    //validate image
    if (req.files && req.files.image) {
      const file_extension = path.extname(req.files.image.name);
      let file_extension_status = CUSTOMER_IMAGE_EXTENSIONS.some(
        (extension) => file_extension === extension
      );

      if (file_extension_status == false) {
        return res.status(400).json({
          code: 400,
          message:
            "Following main image type is not allowed. The allowed image types are" +
            CUSTOMER_IMAGE_EXTENSIONS,
        });
      }

      // check file extension
    }

    const { error, error_message, data } = await edit_customer(
      req.body,
      req.params.id,
      req.files
    );

    if (error) {
      return res.status(400).json({
        code: 400,
        message: error_message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Customer Updated successfully",
      customer: data,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = edit_customer;
