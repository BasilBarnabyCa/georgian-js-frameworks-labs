var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main";

/* GET home page. */
router.get("/dashboard", function (req, res, next) {
  res.render("index", { title: "Dashboard", breadcrumbs: "Home", layout: mainLayout });
});

/* Admin Airline Routes */
var airlinesRouter = require("./airportAdminRoutes/airlines");
router.use("/airlines", airlinesRouter);

/* Admin Airport Routes */
var airportsRouter = require("./airportAdminRoutes/airports");
router.use("/airports", airportsRouter);

module.exports = router;
