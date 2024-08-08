var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const Airport = require("../../models/airport");

// Define the props object
const props = {
	type: "Airport",
	breadcrumbs: "Admin",
	url: "admin/airports"
};

/* GET /admin/airports */
router.get("/", async (req, res, next) => {
	try {
		let airports = await Airport.find().sort([["name", "ascending"]]);
		res.render(`${props.url}/index`, { layout: mainLayout, title: "Airports", props: props, dataset: airports });
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/airports/add */
router.get("/add", (req, res, next) => {
	res.render(`${props.url}/add`, { layout: mainLayout, title: "Add Airport", props: props });
});

/* POST /admin/airports/add */
router.post("/add", async (req, res, next) => {
	try {
		let newAirport = new Airport({
			name: req.body.name,
			iata: req.body.iata,
			icao: req.body.icao,
			createDate: new Date()
		});
		await newAirport.save();
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/airports/edit/:_id */
router.get("/edit/:_id", async (req, res, next) => {
	try {
		let airportId = req.params._id;
		let airportData = await Airport.findById(airportId);
		res.render(`${props.url}/edit`, { layout: mainLayout, title: "Edit Airport", props: props, airport: airportData });
	} catch (error) {
		next(error);
	}
});

/* UPDATE /admin/airports/edit/:_id */
router.post("/edit/:_id", async (req, res, next) => {
	try {
		let airportId = req.params._id;
		await Airport.findByIdAndUpdate(
			airportId,
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

/* DELETE /admin/airports/delete/:_id */
router.get('/delete/:_id', async (req, res, next) => {
	try {
		let airportId = req.params._id;
		await Airport.deleteOne({ _id: airportId });
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
