var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main";

/* GET home page. */
router.get("/dashboard", function (req, res, next) {
  res.render("index", { title: "Dashboard", breadcrumbs: "Home", layout: mainLayout });
});

/* Access Control Routes */
var rolesRouter = require("./airportAdminRoutes/roles");
router.use("/roles", rolesRouter);

var usersRouter = require("./airportAdminRoutes/users");
router.use("/users", usersRouter);

/* Admin Airline Routes */
var airlinesRouter = require("./airportAdminRoutes/airlines");
router.use("/airlines", airlinesRouter);

/* Admin Airport Routes */
var airportsRouter = require("./airportAdminRoutes/airports");
router.use("/airports", airportsRouter);

/* Admin Flight Routes */
var flightsRouter = require("./airportAdminRoutes/flights");
router.use("/flights", flightsRouter);

/* Admin Carousel Routes */
var carouselsRouter = require("./airportAdminRoutes/carousels");
router.use("/carousels", carouselsRouter);

/* Admin Gate Routes */
var gatesRouter = require("./airportAdminRoutes/gates");
router.use("/gates", gatesRouter);

/* Admin Check-In Counter Routes */
var checkInCountersRouter = require("./airportAdminRoutes/checkInCounters");
router.use("/check-in-counters", checkInCountersRouter);

/* Admin Seeder Routes */
var seederRouter = require("./airportAdminRoutes/seeder");
router.use("/seeders", seederRouter);

module.exports = router;
