const {
  add_room,
  detail_room,
  get_room_details,
  find_room_by_id,
  delete_room_by_id,
  list_room,
} = require("../DAL/booking");

// Create Room
const _addroom = async (body, resp) => {
  
  // create new room
  const room = await add_room(body);

  if (!room) {
    resp.error = true;
    resp.error_message = "Room creation Fail";
    return resp;
  }

  resp.data = room;

  return resp;
};

const add_new_room = async (body) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _addroom(body, resp);
  return resp;
};

// Edit Room Detail
const _editroom = async (body, room_id, resp) => {
  const room = await find_room_by_id(room_id);

  if (!room) {
    resp.error = true;
    resp.error_message = "Room Not Found";
    return resp;
  }

  room.room_name = body.room_name;
  room.room_number = body.room_number;
  room.room_available = body.room_available;

  let editroom = await room.save();

  if (!editroom) {
    resp.error = true;
    resp.error_message = "Room Update Failed";
    return resp;
  }

  resp.data = room;
  return resp;
};

const edit_room = async (body, room_id) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _editroom(body, room_id, resp);
  return resp;
};

// Getting Room List
const _listroom = async (resp) => {
  const room = await list_room();

  resp.data = {
    Customer: room,
  };

  return resp;
};

const list_room = async () => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _listroom(resp);
  return resp;
};

// Getting Room Details
const _detailroom = async (room_id, resp) => {
  
  const room = await detail_room(room_id);

  if (!room) {
    resp.error = true;
    resp.error_message = "Room Not Found";
    return resp;
  }

  resp.data = {
    room: room,
  };

  return resp;
};

const detail_room = async (room_id) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _detailroom(room_id, resp);
  return resp;
};

// Delete Room Details
const _deleteroom = async (room_id, resp) => {
  const room = await delete_room_by_id(room_id);
  if (!room) {
    resp.error = true;
    resp.error_message = "Room is not exist for the given Id.";
    return resp;
  }

  resp.data = {
    room: room,
  };

  return resp;
};

const delete_room = async (room_id) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _deleteroom(room_id, resp);
  return resp;
};


module.exports = {
  add_new_room,
  detail_room,
  edit_room,
  list_room,
  delete_room,
};
