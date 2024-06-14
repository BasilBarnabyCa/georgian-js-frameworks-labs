var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "It's Basil | Home" });
});

router.get("/projects", function (req, res, next) {
  res.render("projects", { title: "It's Basil | Projects" });
});

router.get("/about", function (req, res, next) {
  res.render("about", { title: "It's Basil | About" });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "It's Basil | Contact" });
});

module.exports = router;
