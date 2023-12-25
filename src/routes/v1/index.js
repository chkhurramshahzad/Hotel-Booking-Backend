
const customer = require("./route_objects/customer");
const booking = require("./route_objects/booking");
const room = require("./route_objects/room");

const v1_routes = (app) => {
  app.use("/api/customer", customer);
  app.use("/api/booking", booking);
  app.use("/api/room", room);
};

module.exports = { v1_routes };
