const { Booking } = require("../../src/models/booking");

//creating customer
const add_booking = async (body,item_info ) => {
  let add_booking = new Booking({
    customer_id: body.customer_id,
    room_info: item_info,
    booking_number: body.booking_number,
    direct_booking: body.direct_booking,
    indirect_booking: body.indirect_booking,
  });

  add_booking = await add_booking.save();
  return add_booking;
};

//Getting customer detail
const detail_booking = async (booking_id) => {
  const booking = Booking.findOne({ _id: booking_id });
  return booking;
};

//Getting customer detail
const get_booking_details = async (booking_id) => {
  const booking = Booking.findOne({ _id: booking_id });
  return booking;
};

//Getting customer list
const list_booking = async () => {
  return await Booking.find().sort({ createdAt: -1 });
};

//Getting customer and user details by id
const find_booking_by_id = async (booking_id) => {
  return await Booking.findOne({ _id: booking_id });
};

//Delete customer details by id
const delete_booking_by_id = async (booking_id) => {
  return await Booking.findByIdAndDelete({ _id: booking_id });
};

module.exports = {
  add_booking,
  detail_booking,
  get_booking_details,
  find_booking_by_id,
  delete_booking_by_id,
  list_booking,
};
