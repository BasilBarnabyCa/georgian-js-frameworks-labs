var express = require("express");
var router = express.Router();
var guestLayout = "layouts/guest";
var passport = require("passport");
const user = require("../../models/user");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home", layout: guestLayout, user: req.user });
});

module.exports = router;
