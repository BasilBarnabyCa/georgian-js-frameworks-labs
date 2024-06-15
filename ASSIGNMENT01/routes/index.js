var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "It's Basil | Home" });
});

router.get("/about", function (req, res, next) {
  res.render("about", { title: "It's Basil | About" });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "It's Basil | Contact" });
});

router.get("/projects", function (req, res, next) {
  res.render("projects/index", { title: "It's Basil | Projects" });
});

router.get("/projects/cpms", function (req, res, next) {
  res.render("projects/cpms", { title: "It's Basil | Projects | CPMS" });
});

router.get("/projects/mbet-topup", function (req, res, next) {
  res.render("projects/mbet", { title: "It's Basil | Projects | MBet Topup" });
});

router.get("/projects/geobet-analysis-tool", function (req, res, next) {
  res.render("projects/geobet", {
    title: "It's Basil | Projects | GeoBet Analysis Tool",
  });
});

router.get("/projects/sitamate", function (req, res, next) {
  res.render("projects/sitamate", {
    title: "It's Basil | Projects | SitaMate",
  });
});

router.get("/projects/banner-ultra-2", function (req, res, next) {
  res.render("projects/banner", {
    title: "It's Basil | Projects | Banner Ultra v2",
  });
});

router.get("/projects/svrel", function (req, res, next) {
  res.render("projects/svrel", {
    title: "It's Basil | Projects | SVREL Website",
  });
});

router.get("/projects/cosmos", function (req, res, next) {
  res.render("projects/cosmos", {
    title: "It's Basil | Projects | Cosmos",
  });
});

router.get("/projects/brmity", function (req, res, next) {
  res.render("projects/brmity", {
    title: "It's Basil | Projects | BRMity",
  });
});

module.exports = router;
