var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const Gate = require("../../models/gate");

// Define the props object
const props = {
	type: "Gate",
	breadcrumbs: "Admin",
	url: "admin/gates"
};

/* GET /admin/gates */
router.get("/", async (req, res, next) => {
	try {
		let gates = await Gate.find().sort([["name", "ascending"]]);
		res.render(`${props.url}/index`, { layout: mainLayout, title: "Boarding Gates", props: props, dataset: gates });
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/gates/add */
router.get("/add", (req, res, next) => {
	res.render(`${props.url}/add`, { layout: mainLayout, title: "Add Boarding Gate", props: props });
});

/* POST /admin/gates/add */
router.post("/add", async (req, res, next) => {
	try {
		let newGate = new Gate({
			name: req.body.name
		});
		await newGate.save();
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/gates/edit/:_id */
router.get("/edit/:_id", async (req, res, next) => {
	try {
		let gateId = req.params._id;
		let gateData = await Gate.findById(gateId);
		res.render(`${props.url}/edit`, { layout: mainLayout, title: "Edit Boarding Gate", props: props, gate: gateData });
	} catch (error) {
		next(error);
	}
});

/* UPDATE /admin/gates/edit/:_id */
router.post("/edit/:_id", async (req, res, next) => {
	try {
		let gateId = req.params._id;
		await Gate.findByIdAndUpdate(
			gateId,
			{
				name: req.body.name
			}
		);
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

/* DELETE /admin/gates/delete/:_id */
router.get('/delete/:_id', async (req, res, next) => {
	try {
		let gateId = req.params._id;
		await Gate.deleteOne({ _id: gateId });
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
