var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const Airport = require("../../models/airport");
const airportDataset = require("../../seeders/airports");

const Airline = require("../../models/airline");
const airlineDataset = require("../../seeders/airlines");

const Gate = require("../../models/gate");
const gateDataset = require("../../seeders/gates");

const Carousel = require("../../models/carousel");
const carouselDataset = require("../../seeders/carousels");

const CheckInCounter = require("../../models/checkInCounter");

// Define the props object
const props = {
	type: "Seeder",
	breadcrumbs: "Admin",
	url: "admin/seeders",
	objects: {
		airlines: "airlines",
		airports: "airports",
		gates: "gates",
		carousels: "carousels",
		checkInCounters: "check-in-counters"
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

router.get("/seed-gates", async (req, res, next) => {
	try {
		// Clear the existing collection
		await Gate.deleteMany({});

		// Insert the new data
		await Gate.insertMany(gateDataset);

		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

router.get("/seed-carousels", async (req, res, next) => {
	try {
		// Clear the existing collection
		await Carousel.deleteMany({});

		// Insert the new data
		await Carousel.insertMany(carouselDataset);

		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

router.get("/seed-check-in-counters", async (req, res, next) => {
	try {
		// Clear the existing collection
		await CheckInCounter.deleteMany({});

		// Insert the new data
		const checkInCounters = generateCheckInCounters(100);
		await CheckInCounter.insertMany(checkInCounters);

		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

// Generate check-in counters
const generateCheckInCounters = (numCounters) => {
	const counters = [];

	for (let i = 1; i <= numCounters; i++) {
		counters.push({
			name: `CHK${i}`
		});
	}

	return counters;
};


module.exports = router;
