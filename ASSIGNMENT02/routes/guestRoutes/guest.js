var express = require("express");
var router = express.Router();
var guestLayout = "layouts/guest";
const Airline = require("../../models/airline");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home", layout: guestLayout, user: req.user });
});

/* GET /airlines-demo */
router.get("/airlines-demo", async (req, res, next) => {
	try {
		let airlines = await Airline.find().sort([["name", "ascending"]]);
		res.render("airlines-demo", { layout: guestLayout, title: "Airlines Collection Demo", dataset: airlines });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
