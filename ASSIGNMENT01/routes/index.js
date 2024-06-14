var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "It's Basil | Home" });
});

router.get("/portfolio", function (req, res, next) {
  res.render("portfolio", { title: "It's Basil | Portfolio" });
});

router.get("/experience", function (req, res, next) {
  res.render("experience", { title: "It's Basil | Experience" });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "It's Basil | Contact" });
});

module.exports = router;
