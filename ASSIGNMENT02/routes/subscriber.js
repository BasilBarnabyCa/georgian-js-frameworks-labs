var express = require("express");
var router = express.Router();

/* Flights */
var flightsRouter = require("./subscriberRoutes/flights");
router.use("/flights", flightsRouter);

module.exports = router;
