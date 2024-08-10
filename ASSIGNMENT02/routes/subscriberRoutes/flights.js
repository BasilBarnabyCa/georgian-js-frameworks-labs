var express = require("express");
var router = express.Router();
var subscriberLayout = "layouts/guest"; // Dashboard layout

const Flight = require("../../models/flight");

/* GET /admin/flights */
router.get("/", async (req, res, next) => {
	try {
		let flights = await Flight.find().sort([["createdAt", "descending"]]);
		res.render("subscriber/flights", { layout: subscriberLayout, title: "Flight Schedule", dataset: flights,  user: req.user});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
