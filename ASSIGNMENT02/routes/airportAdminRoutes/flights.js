var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const Flight = require("../../models/flight");
const Airline = require("../../models/airline");
const Airport = require("../../models/airport");
const Gate = require("../../models/gate");
const Carousel = require("../../models/carousel");

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
router.get("/add", async (req, res, next) => {
	let airlineList = await Airline.find().sort([
		["name", "ascending"],
	]);
	let typeList = ["Departure", "Arrival"];
	let originAirportList = await Airport.find().sort([
		["name", "ascending"],
	]);
	let destinationAirportList = await Airport.find().sort([
		["name", "ascending"],
	]);
	let gateList = await Gate.find().sort([
		["name", "ascending"],
	]);
	let carouselList = await Carousel.find().sort([
		["name", "ascending"],
	]);

	res.render(`${props.url}/add`, { layout: mainLayout, title: "Add Flight", props: props, airlines: airlineList, types: typeList, originAirports: originAirportList, destinationAirports: destinationAirportList, gates: gateList, carousels: carouselList });
});

/* POST /admin/flights/add */
router.post("/add", async (req, res, next) => {
	try {
		let airline = await Airline.findOne({ name: req.body.airline });
		let originAirport = await Airport.findOne({ iata: req.body.originAirport.substring(0, 3) });
		let destinationAirport = await Airport.findOne({ iata: req.body.destinationAirport.substring(0, 3) });
		let newFlight = new Flight({
			airline: req.body.airline,
			flightNumber: `${airline.iata}${req.body.flightNumber}`,
			movementType: req.body.type,
			originAirport: originAirport.iata,
			originCity: originAirport.city,
			destinationAirport: destinationAirport.iata,
			destinationCity: destinationAirport.city,
			departureTime: new Date(req.body.departureTime),
			arrivalTime: new Date(req.body.arrivalTime),
			gate: req.body.gate,
			carousel: req.body.carousel,
			status: "Scheduled"
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
		let airline = await Airline.findOne({ name: req.body.airline });
		let originAirport = await Airport.findOne({ iata: req.body.originAirport.substring(0, 3) });
		let destinationAirport = await Airport.findOne({ iata: req.body.destinationAirport.substring(0, 3) });
		await Flight.findByIdAndUpdate(
			flightId,
			{
				airline: req.body.airline,
				flightNumber: `${airline.iata}${req.body.flightNumber}`,
				movementType: req.body.type,
				originAirport: originAirport.iata,
				originCity: originAirport.city,
				destinationAirport: destinationAirport.iata,
				destinationCity: destinationAirport.city,
				departureTime: new Date(req.body.departureTime),
				arrivalTime: new Date(req.body.arrivalTime),
				gate: req.body.gate,
				carousel: req.body.carousel,
				status: req.body.status
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
