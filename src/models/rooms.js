const mongoose = require("mongoose");
const _ = require("lodash");

const room_schema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  room_name: {
    type: String,
  },
  room_number: {
    type: String,
  },
  room_available: {
    type: Boolean,
    default: true,
  },
});

room_schema.plugin(timestamps);

room_schema.methods.toJSON = function () {
  const room = this;
  const roomObject = room.toObject();
  const roomJson = _.pick(roomObject, [
    "_id",
    "customer_id",
    "room_name",
    "room_number",
    "room_available",
    "createdAt",
    "updatedAt",
  ]);
  return roomJson;
};

const Room = mongoose.model("Room", room_schema);
exports.Room = Room;
