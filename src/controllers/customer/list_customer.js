const { list_customer } = require("../../services/customer");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const list_customer = async (req, res) => {
  try {
    const { error, error_message, data } = await list_customer();

    if (error) {
      return res.status(400).json({
        code: 400,
        message: error_message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Customer List",
      employeeuser: data.customer,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = list_customer;
