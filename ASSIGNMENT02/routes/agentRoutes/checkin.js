var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const Flight = require("../../models/flight");

// Define the props object
const props = {
	type: "Flight",
	breadcrumbs: "Admin",
	url: "admin/flights"
};

/* GET /admin/flights */
router.get("/", async (req, res, next) => {
	try {
		let flights = await Flight.find().sort([["createdAt", "descending"]]);
		res.render(`${props.url}/index`, { layout: mainLayout, title: "Flight Schedule", props: props, dataset: flights });
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/flights/add */
router.get("/add", (req, res, next) => {
	res.render(`${props.url}/add`, { layout: mainLayout, title: "Add Flight", props: props });
});

/* POST /admin/flights/add */
router.post("/add", async (req, res, next) => {
	try {
		let newFlight = new Flight({
			name: req.body.name,
			iata: req.body.iata,
			icao: req.body.icao,
			createDate: new Date()
		});
		await newFlight.save();
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/flights/edit/:_id */
router.get("/edit/:_id", async (req, res, next) => {
	try {
		let flightId = req.params._id;
		let flightData = await Flight.findById(flightId);
		res.render(`${props.url}/edit`, { layout: mainLayout, title: "Edit Flight", props: props, flight: flightData });
	} catch (error) {
		next(error);
	}
});

/* UPDATE /admin/flights/edit/:_id */
router.post("/edit/:_id", async (req, res, next) => {
	try {
		let flightId = req.params._id;
		await Flight.findByIdAndUpdate(
			flightId,
			{
				name: req.body.name,
				iata: req.body.iata,
				icao: req.body.icao
			}
		);
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

/* DELETE /admin/flights/delete/:_id */
router.get('/delete/:_id', async (req, res, next) => {
	try {
		let flightId = req.params._id;
		await Flight.deleteOne({ _id: flightId });
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
