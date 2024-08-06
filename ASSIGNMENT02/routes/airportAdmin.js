var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main";
var authLayout = "layouts/auth";

/* GET home page. */
router.get("/dashboard", function (req, res, next) {
  res.render("index", { title: "Dashboard", breadcrumbs: "Home", layout: mainLayout });
});

router.get("/airlines", function (req, res, next) {
  res.render("airlines", { title: "Airlines", breadcrumbs: "Admin", layout: mainLayout });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Authenticate", layout: authLayout });
});

module.exports = router;
