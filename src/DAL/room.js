const { Room } = require("../../src/models/rooms");

//creating customer
const add_room = async (body) => {
  let add_room = new Room({
    customer_id: body.customer_id,
    room_name: body.room_name,
    room_number: body.room_number,
    room_available: body.room_available,
  });

  add_room = await add_room.save();
  return add_room;
};

//Getting customer detail
const detail_room = async (room_id) => {
  const room = Room.findOne({ _id: room_id });
  return room;
};

//Getting customer detail
const get_room_details = async (room_id) => {
  const room = Room.findOne({ _id: room_id });
  return room;
};

//Getting customer list
const list_room = async () => {
  return await Room.find().sort({ createdAt: -1 });
};

//Getting customer and user details by id
const find_room_by_id = async (room_id) => {
  return await Room.findOne({ _id: room_id });
};

//Delete customer details by id
const delete_room_by_id = async (room_id) => {
  return await Room.findByIdAndDelete({ _id: room_id });
};

module.exports = {
  add_room,
  detail_room,
  get_room_details,
  find_room_by_id,
  delete_room_by_id,
  list_room,
};
