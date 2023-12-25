const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");

const customer_schema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  address: {
    type: String,
  },
  profile_image: {
    type: String,
    default: "",
  },
  status: {
    type: Boolean,
    default: true,
  },
  contact_number: {
    type: String,
    default: "",
  },
  email: {
    type: String,
  },
  password: {
    type: Number,
  },
});

customer_schema.plugin(timestamps);

customer_schema.methods.toJSON = function () {
  const customer = this;
  const customerObject = customer.toObject();
  const customerJson = _.pick(customerObject, [
    "_id",
    "first_name",
    "last_name",
    "address",
    "profile_image",
    "contact_number",
    "email",
    "status",
    "password",
    "createdAt",
    "updatedAt",
  ]);
  return customerJson;
};

const Customer = mongoose.model("Customer", customer_schema);
exports.Customer = Customer;
