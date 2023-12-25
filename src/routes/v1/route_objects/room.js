const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
const add_room = require("../../../controllers/room/add_room");
const delete_room = require("../../../controllers/room/delete_room");
const detail_room = require("../../../controllers/room/detail_room");
const edit_room = require("../../../controllers/room/edit_room");
const list_room = require("../../../controllers/room/list_room");

register_route({
  router,
  route: "/add_room",
  post_method: add_room,
});

register_route({
  router,
  route: "/edit_room",
  put_method: edit_room,
});

register_route({
  router,
  route: "/list_room",
  get_method: list_room,
});

register_route({
  router,
  route: "/delete_room/:id",
  delete_method: delete_room,
});

register_route({
  router,
  route: "/detail_room/:id",
  get_method: detail_room,
});

