const {
  add_customer,
  detail_customer,
  find_customer_by_id,
  delete_customer_by_id,
  get_customer_details,
  list_customer,
} = require("../DAL/customer");
const { CUSTOMER_IMAGE_PATH } = require("../utils/constants");

const { UPLOAD_FILE_ON_LOCAL, DELETE_LOCAL_FILE } = require("../utils/utils");

// Create Customer
const _addcustomer = async (body, files, resp) => {
  // upload the image

  const customer_image = await UPLOAD_FILE_ON_LOCAL(
    files.image,
    CUSTOMER_IMAGE_PATH,
    resp
  );

  if (!customer_image) {
    resp.error = true;
    resp.error_message = "Something went wrong";
    return resp;
  }

  // create new customer
  const customer = await add_customer(body);

  if (!customer) {
    resp.error = true;
    resp.error_message = "Customer creation Fail";
    return resp;
  }

  resp.data = customer;

  return resp;
};

const add_new_customer = async (body, files) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _addcustomer(body, files, resp);
  return resp;
};

// Edit Customer Detail
const _editcustomer = async (body, customer_id, files, resp) => {
  const customer = await find_customer_by_id(customer_id);

  if (!customer) {
    resp.error = true;
    resp.error_message = "Customer Not Found";
    return resp;
  }

  if (
    files &&
    files !== undefined &&
    files.image !== "" &&
    files.image &&
    files.image !== undefined &&
    files.image !== null &&
    files.image !== ""
  ) {
    const customer_image = await UPLOAD_FILE_ON_LOCAL(
      files.image,
      CUSTOMER_IMAGE_PATH,
      resp
    );

    if (!customer_image) {
      resp.error = true;
      resp.error_message = "Something went wrong";
      return resp;
    }
    DELETE_LOCAL_FILE(customer.image);
    customer.image = customer_image;
  }

  customer.first_name = body.first_name;
  customer.last_name = body.last_name;
  customer.address = body.address;
  customer.contact_number = body.contact_number;
  customer.status = body.status;

  let editcustomer = await customer.save();

  if (!editcustomer) {
    resp.error = true;
    resp.error_message = "Customer Update Failed";
    return resp;
  }

  resp.data = customer;
  return resp;
};

const edit_customer = async (body, customer_id, files) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _editcustomer(body, customer_id, files, resp);
  return resp;
};

// Getting Customer List
const _listcustomer = async (resp) => {
  const Customer = await list_customer();

  resp.data = {
    Customer: Customer,
  };

  return resp;
};

const list_customer = async () => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _listcustomer(resp);
  return resp;
};

// Getting customer Details
const _detailcustomer = async (customer_id, resp) => {
  
  const customer = await detail_customer(customer_id);

  if (!customer) {
    resp.error = true;
    resp.error_message = "customer Not Found";
    return resp;
  }

  resp.data = {
    customer: customer,
  };

  return resp;
};

const detail_customer = async (customer_id) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _detailcustomer(customer_id, resp);
  return resp;
};

// Delete Customer Details
const _deletevendor = async (customer_id, resp) => {
  const customer = await delete_customer_by_id(customer_id);
  if (!customer) {
    resp.error = true;
    resp.error_message = "customer is not exist for the given Id.";
    return resp;
  }

  resp.data = {
    customer: customer,
  };

  return resp;
};

const delete_customer = async (customer_id) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _deletevendor(customer_id, resp);
  return resp;
};


module.exports = {
  add_new_customer,
  detail_customer,
  edit_customer,
  list_customer,
  delete_customer,
};
