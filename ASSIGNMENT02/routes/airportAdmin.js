var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main";

/* GET home page. */
router.get("/dashboard", function (req, res, next) {
  res.render("index", { title: "Dashboard", breadcrumbs: "Home", layout: mainLayout });
});

router.get("/airlines", function (req, res, next) {
  res.render("admin/airlines", { title: "Airlines", breadcrumbs: "Admin", layout: mainLayout });
});

module.exports = router;
