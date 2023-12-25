const {
  validate_customer,
} = require("../../utils/validation/validate_customer");
const { add_new_customer } = require("../../services/customer");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const path = require("path");
const { CUSTOMER_IMAGE_EXTENSIONS } = require("../../utils/constants");

const create_customer = async (req, res) => {
  try {
    //validate Request Body
    try {
      await validate_customer(req.body);
    } catch (e) {
      return res.status(400).json({
        code: 400,
        message: e.details[0].message.replace(/\"/g, ""),
      });
    }

    //validate image
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        code: 400,
        message: " Image is required",
      });
    }

    // check file extension
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

    const { error, error_message, data } = await add_new_customer(
      req.body,
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
      message: "Customer Added Successfully",
      Customer: data,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = create_customer;
