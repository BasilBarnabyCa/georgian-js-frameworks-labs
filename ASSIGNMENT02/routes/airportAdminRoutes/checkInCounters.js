var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const CheckInCounter = require("../../models/checkInCounter");

// Define the props object
const props = {
	type: "Check-In Counter",
	breadcrumbs: "Admin",
	url: "admin/check-in-counters",
};

/* GET /admin/check-in-counters */
router.get("/", async (req, res, next) => {
	try {
		let checkInCounters = await CheckInCounter.find().sort([["createdAt", "ascending"]]);
		res.render(`${props.url}/index`, { layout: mainLayout, title: "Check-in Counters", props: props, dataset: checkInCounters });
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/check-in-counters/add */
router.get("/add", (req, res, next) => {
	res.render(`${props.url}/add`, { layout: mainLayout, title: "Add Check-in Counter", props: props });
});

/* POST /admin/check-in-counters/add */
router.post("/add", async (req, res, next) => {
	try {
		let newCheckInCounter = new CheckInCounter({
			name: req.body.name
		});
		await newCheckInCounter.save();
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/check-in-counters/edit/:_id */
router.get("/edit/:_id", async (req, res, next) => {
	try {
		let checkInCounterId = req.params._id;
		let checkInCounterData = await CheckInCounter.findById(checkInCounterId);
		res.render(`${props.url}/edit`, { layout: mainLayout, title: "Edit Check-in Counter", props: props, checkInCounter: checkInCounterData });
	} catch (error) {
		next(error);
	}
});

/* UPDATE /admin/check-in-counters/edit/:_id */
router.post("/edit/:_id", async (req, res, next) => {
	try {
		let checkInCounterId = req.params._id;
		await CheckInCounter.findByIdAndUpdate(
			checkInCounterId,
			{
				name: req.body.name
			}
		);
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

/* DELETE /admin/check-in-counters/delete/:_id */
router.get('/delete/:_id', async (req, res, next) => {
	try {
		let checkInCounterId = req.params._id;
		await CheckInCounter.deleteOne({ _id: checkInCounterId });
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
