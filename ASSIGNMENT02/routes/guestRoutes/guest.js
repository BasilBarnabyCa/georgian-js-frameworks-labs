var express = require("express");
var router = express.Router();
var guestLayout = "layouts/guest";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home", layout: guestLayout });
});

module.exports = router;
