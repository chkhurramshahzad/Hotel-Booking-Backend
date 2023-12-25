const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
const add_customer = require("../../../controllers/customer/add_customer");
const delete_customer = require("../../../controllers/customer/delete_customer");
const detail_customer = require("../../../controllers/customer/detail_customer");
const edit_customer = require("../../../controllers/customer/edit_customer");
const list_customer = require("../../../controllers/customer/list_customer");

register_route({
  router,
  route: "/add_customer",
  post_method: add_customer,
});

register_route({
  router,
  route: "/add_customer",
  post_method: add_customer_by_admin,
});

register_route({
  router,
  route: "/edit_customer",
  put_method: edit_customer,
});

register_route({
  router,
  route: "/list_customer",
  get_method: list_customer,
});

register_route({
  router,
  route: "/delete_customer/:id",
  delete_method: delete_customer,
});

register_route({
  router,
  route: "/detail_customer/:id",
  get_method: detail_customer,
});

