var express = require("express");
var router = express.Router();
var authLayout = "layouts/auth";

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Authenticate", layout: authLayout });
});

module.exports = router;
