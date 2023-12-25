const { Customer } = require("../../src/models/customer");

//creating customer
const add_customer = async (body) => {
  let add_customer = new Customer({
    first_name: body.first_name,
    last_name: body.last_name,
    status: body.status,
    profile_image: body.profile_image ? body.profile_image : "",
    address: body.address,
    contact_number: body.contact_number,
  });

  add_customer = await add_customer.save();
  return add_customer;
};

//Getting customer detail
const detail_customer = async (customer_id) => {
  const customer = Customer.findOne({ _id: customer_id }).populate(
    "user_id",
    "email"
  );
  return customer;
};

//Getting customer detail
const get_customer_details = async (customer_id) => {
  const customer = Customer.findOne({ _id: customer_id });
  return customer;
};

//Getting customer list
const list_customer = async () => {
  return await Customer.find().sort({ createdAt: -1 });
};

//Getting customer and user details by id
const find_customer_by_id = async (customer_id, user_id) => {
  return await Customer.findOne({ _id: customer_id, user_id: user_id });
};

//Delete customer details by id
const delete_customer_by_id = async (customer_id) => {
  return await Customer.findByIdAndDelete({ _id: customer_id });
};

module.exports = {
  add_customer,
  detail_customer,
  find_customer_by_id,
  delete_customer_by_id,
  get_customer_details,
  list_customer,
};
