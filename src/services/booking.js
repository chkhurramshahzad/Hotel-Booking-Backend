const {
  add_booking,
  detail_booking,
  get_booking_details,
  find_booking_by_id,
  delete_booking_by_id,
  list_booking,
} = require("../DAL/booking");

// Create Booking
const _addbooking = async (body, resp) => {
  
  // create new booking
  const booking = await add_booking(body);

  if (!booking) {
    resp.error = true;
    resp.error_message = "Booking creation Fail";
    return resp;
  }

  resp.data = booking;

  return resp;
};

const add_new_booking = async (body) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _addbooking(body, resp);
  return resp;
};

// Edit Room Detail
const _editbooking = async (body, booking_id, resp) => {
  const booking = await find_booking_by_id(booking_id);

  if (!booking) {
    resp.error = true;
    resp.error_message = "Booking Not Found";
    return resp;
  }

  booking.booking_number = body.booking_name;
  booking.direct_booking = body.direct_booking;
  booking.indirect_booking = body.indirect_booking;

  let editbooking= await booking.save();

  if (!editbooking) {
    resp.error = true;
    resp.error_message = "Booking Update Failed";
    return resp;
  }

  resp.data = booking;
  return resp;
};

const edit_booking = async (body, booking_id) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _editbooking(body, booking_id, resp);
  return resp;
};

// Getting Booking List
const _listbooking = async (resp) => {
  const booking = await list_booking();

  resp.data = {
    Booking: booking,
  };

  return resp;
};

const list_booking = async () => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _listbooking(resp);
  return resp;
};

// Getting Booking Details
const _detailbooking = async (booking_id, resp) => {
  
  const booking = await detail_booking(booking_id);

  if (!booking) {
    resp.error = true;
    resp.error_message = "Booking Not Found";
    return resp;
  }

  resp.data = {
    booking: booking,
  };

  return resp;
};

const detail_booking = async (booking_id) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _detailbooking(booking_id, resp);
  return resp;
};

// Delete Booking Details
const _deletebooking= async (booking_id, resp) => {
  const booking = await delete_booking_by_id(booking_id);
  if (!booking) {
    resp.error = true;
    resp.error_message = "Booking is not exist for the given Id.";
    return resp;
  }

  resp.data = {
    booking: booking,
  };

  return resp;
};

const delete_booking = async (booking_id) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _deletebooking(booking_id, resp);
  return resp;
};


module.exports = {
  add_new_booking,
  detail_booking,
  edit_booking,
  list_booking,
  delete_booking,
};
