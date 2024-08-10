var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const Route = require("../../models/route");

// Define the props object
const props = {
	type: "Route",
	breadcrumbs: "Admin",
	url: "admin/routes"
};

/* GET /admin/routes */
router.get("/", async (req, res, next) => {
	try {
		let routes = await Route.find().sort([["createdAt", "descending"]]);
		res.render(`${props.url}/index`, { layout: mainLayout, title: "Routes", props: props, dataset: routes });
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/routes/add */
router.get("/add", (req, res, next) => {
	res.render(`${props.url}/add`, { layout: mainLayout, title: "Add Route", props: props });
});

/* POST /admin/routes/add */
router.post("/add", async (req, res, next) => {
	try {
		let newRoute = new Route({
			name: req.body.name,
			iata: req.body.iata,
			icao: req.body.icao,
			createDate: new Date()
		});
		await newRoute.save();
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/routes/edit/:_id */
router.get("/edit/:_id", async (req, res, next) => {
	try {
		let routeId = req.params._id;
		let routeData = await Route.findById(routeId);
		res.render(`${props.url}/edit`, { layout: mainLayout, title: "Edit Route", props: props, route: routeData });
	} catch (error) {
		next(error);
	}
});

/* UPDATE /admin/routes/edit/:_id */
router.post("/edit/:_id", async (req, res, next) => {
	try {
		let routeId = req.params._id;
		await Route.findByIdAndUpdate(
			routeId,
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

/* DELETE /admin/routes/delete/:_id */
router.get('/delete/:_id', async (req, res, next) => {
	try {
		let routeId = req.params._id;
		await Route.deleteOne({ _id: routeId });
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
