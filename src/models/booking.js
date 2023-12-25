const mongoose = require("mongoose");
const _ = require("lodash");

const booking_schema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  room_info: [
    {
      room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
      room_name: {
        type: String,
      },
      room_number: {
        type: Number,
        default: 0,
      },
    },
  ],
  booking_number: {
    type: String,
  },
  direct_booking: {
    type: String,
  },
  indirect_booking: {
    type: String,
  },
});

booking_schema.plugin(timestamps);

booking_schema.methods.toJSON = function () {
  const booking = this;
  const bookingObject = booking.toObject();
  const bookingJson = _.pick(bookingObject, [
    "_id",
    "customer_id",
    "room_id",
    "booking_number",
    "direct_booking",
    "indirect_booking",
    "createdAt",
    "updatedAt",
  ]);
  return roomJson;
};

const Booking = mongoose.model("Booking", booking_schema);
exports.Booking = Booking;
