var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const Airport = require("../../models/airport");
const airportDataset = require("../../seeders/airports");

const Airline = require("../../models/airline");
const airlineDataset = require("../../seeders/airlines");

// Define the props object
const props = {
	type: "Seeder",
	breadcrumbs: "Admin",
	url: "admin/seeders",
	objects: {
		airlines: "airlines",
		airports: "airports"
	}
};

/* Show Seeder page */
router.get("/", async (req, res, next) => {
	try {
		res.render(`${props.url}/index`, { layout: mainLayout, title: "Seeders", props: props });
	} catch (error) {
		next(error);
	}
});

/* Seed the database with airports */
router.get("/seed-airports", async (req, res, next) => {
	try {
		// Clear the existing collection
		await Airport.deleteMany({});

		// Insert the new data
		await Airport.insertMany(airportDataset);

		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

/* Seed the database with airlines */
router.get("/seed-airlines", async (req, res, next) => {
	try {
		// Clear the existing collection
		await Airline.deleteMany({});

		// Insert the new data
		await Airline.insertMany(airlineDataset);

		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});


module.exports = router;
