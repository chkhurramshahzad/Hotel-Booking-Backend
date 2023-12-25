const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
const add_booking = require("../../../controllers/booking/add_booking");
const delete_booking = require("../../../controllers/booking/delete_booking");
const detail_booking = require("../../../controllers/booking/detail_booking");
const edit_booking = require("../../../controllers/booking/edit_booking");
const list_booking = require("../../../controllers/booking/list_booking");

register_route({
  router,
  route: "/add_booking",
  post_method: add_booking,
});

register_route({
  router,
  route: "/edit_booking",
  put_method: edit_booking,
});

register_route({
  router,
  route: "/list_booking",
  get_method: list_booking,
});

register_route({
  router,
  route: "/delete_booking/:id",
  delete_method: delete_booking,
});

register_route({
  router,
  route: "/detail_booking/:id",
  get_method: detail_booking,
});

