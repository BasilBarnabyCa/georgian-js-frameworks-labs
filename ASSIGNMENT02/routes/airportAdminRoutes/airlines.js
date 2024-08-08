var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const Airline = require("../../models/airline");

// Define the props object
const props = {
	type: "Airline",
	breadcrumbs: "Admin",
	url: "admin/airlines"
};

/* GET /admin/airlines */
router.get("/", async (req, res, next) => {
	try {
		let airlines = await Airline.find().sort([["name", "ascending"]]);
		res.render(`${props.url}/index`, { layout: mainLayout, title: "Airlines", props: props, dataset: airlines });
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/airlines/add */
router.get("/add", (req, res, next) => {
	res.render(`${props.url}/add`, { layout: mainLayout, title: "Add Airline", props: props });
});

/* POST /admin/airlines/add */
router.post("/add", async (req, res, next) => {
	try {
		let newAirline = new Airline({
			name: req.body.name,
			iata: req.body.iata,
			icao: req.body.icao,
			createDate: new Date()
		});
		await newAirline.save();
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/airlines/edit/:_id */
router.get("/edit/:_id", async (req, res, next) => {
	try {
		let airlineId = req.params._id;
		let airlineData = await Airline.findById(airlineId);
		res.render(`${props.url}/edit`, { layout: mainLayout, title: "Edit Airline", props: props, airline: airlineData });
	} catch (error) {
		next(error);
	}
});

/* UPDATE /admin/airlines/edit/:_id */
router.post("/edit/:_id", async (req, res, next) => {
	try {
		let airlineId = req.params._id;
		await Airline.findByIdAndUpdate(
			airlineId,
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

/* DELETE /admin/airlines/delete/:_id */
router.get('/delete/:_id', async (req, res, next) => {
	try {
		let airlineId = req.params._id;
		await Airline.deleteOne({ _id: airlineId });
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
