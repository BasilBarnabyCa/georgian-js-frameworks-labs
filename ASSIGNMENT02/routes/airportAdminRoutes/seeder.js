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

const Flight = require("../../models/flight");

const Role = require("../../models/role");
const roleDataSet = require("../../seeders/roles");

const User = require("../../models/user");
const generateUsers = require("../../seeders/users");

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
    checkInCounters: "check-in-counters",
    flights: "flights",
	accessControl: "access-control",
  },
};

/* Show Seeder page */
router.get("/", async (req, res, next) => {
  try {
    res.render(`${props.url}/index`, {
      layout: mainLayout,
      title: "Seeders",
      props: props,
    });
  } catch (error) {
    next(error);
  }
});

/* Seed the database with airports */
router.get("/seed-airports", async (req, res, next) => {
  try {
    await Airport.deleteMany({});
    await Airport.insertMany(airportDataset);
    res.redirect(`/${props.url}`);
  } catch (error) {
    next(error);
  }
});

/* Seed the database with airlines */
router.get("/seed-airlines", async (req, res, next) => {
  try {
    await Airline.deleteMany({});
    await Airline.insertMany(airlineDataset);
    res.redirect(`/${props.url}`);
  } catch (error) {
    next(error);
  }
});

router.get("/seed-gates", async (req, res, next) => {
  try {
    await Gate.deleteMany({});
    await Gate.insertMany(gateDataset);
    res.redirect(`/${props.url}`);
  } catch (error) {
    next(error);
  }
});

router.get("/seed-carousels", async (req, res, next) => {
  try {
    await Carousel.deleteMany({});
    await Carousel.insertMany(carouselDataset);
    res.redirect(`/${props.url}`);
  } catch (error) {
    next(error);
  }
});

router.get("/seed-check-in-counters", async (req, res, next) => {
  try {
    await CheckInCounter.deleteMany({});
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
      name: `CHK${i}`,
    });
  }

  return counters;
};

router.get("/seed-flights", async (req, res, next) => {
  try {
    await Flight.deleteMany({});
    const flights = generateFlights(20);
    await Flight.insertMany(flights);
    res.redirect(`/${props.url}`);
  } catch (error) {
    next(error);
  }
});

const generateRandomTime = (baseTime) => {
  const randomOffset = Math.floor(Math.random() * 720) - 360; // Random offset between -6 and 6 hours
  return new Date(baseTime.getTime() + randomOffset * 60000); // Offset in milliseconds
};

// TODO: FIX arrival date to be after departure date
const generateFlights = (numFlights) => {
  const flights = [];
  const baseTime = new Date();
  let carousel = "";

  for (let i = 0; i < numFlights; i++) {
    const originIndex = Math.floor(Math.random() * airlineDataset.length);
    let destinationIndex;
    do {
      destinationIndex = Math.floor(Math.random() * airlineDataset.length);
    } while (destinationIndex === originIndex);

    const airlineIndex = Math.floor(Math.random() * airlineDataset.length);

    const flightNumber = `${airlineDataset[airlineIndex].iata}${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const movementType = ["Departure", "Arrival"];
    const movementTypeIndex = Math.floor(Math.random() * movementType.length);

    if (movementType[movementTypeIndex] !== "Departure") {
      const carouselIndex = Math.floor(Math.random() * carouselDataset.length);
      carousel = carouselDataset[carouselIndex].name;
    }

    const gateIndex = Math.floor(Math.random() * gateDataset.length);

    const departureTime = generateRandomTime(baseTime);
    const arrivalTime = generateRandomTime(departureTime);

    flights.push({
      flightNumber,
      airline: airlineDataset[airlineIndex].name,
      movementType: movementType[movementTypeIndex],
      originAirport: airportDataset[originIndex].iata,
      originCity: airportDataset[originIndex].city,
      destinationAirport: airportDataset[destinationIndex].iata,
      destinationCity: airportDataset[destinationIndex].city,
      departureTime,
      arrivalTime,
      gate: gateDataset[gateIndex].name,
      carousel,
      status: getRandomStatus(),
    });
  }

  return flights;
};

const getRandomStatus = () => {
  let statusArray = ["Scheduled", "On-time", "Cancelled", "Delayed"];
  return statusArray[Math.floor(Math.random() * statusArray.length)];
};

router.get("/seed-access-control", async (req, res, next) => {
  try {
    await Role.deleteMany({});
    await Role.insertMany(roleDataSet);

    await User.deleteMany({});
    const users = await generateUsers();
    await User.insertMany(users);
    res.redirect(`/${props.url}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
