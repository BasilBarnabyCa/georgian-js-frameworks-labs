var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const Carousel = require("../../models/carousel");

// Define the props object
const props = {
	type: "Carousel",
	breadcrumbs: "Admin",
	url: "admin/carousels"
};

/* GET /admin/carousels */
router.get("/", async (req, res, next) => {
	try {
		let carousels = await Carousel.find().sort([["name", "ascending"]]);
		res.render(`${props.url}/index`, { layout: mainLayout, title: "Baggage Carousels", props: props, dataset: carousels });
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/carousels/add */
router.get("/add", (req, res, next) => {
	res.render(`${props.url}/add`, { layout: mainLayout, title: "Add Baggage Carousel", props: props });
});

/* POST /admin/carousels/add */
router.post("/add", async (req, res, next) => {
	try {
		let newCarousel = new Carousel({
			name: req.body.name
		});
		await newCarousel.save();
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/carousels/edit/:_id */
router.get("/edit/:_id", async (req, res, next) => {
	try {
		let carouselId = req.params._id;
		let carouselData = await Carousel.findById(carouselId);
		res.render(`${props.url}/edit`, { layout: mainLayout, title: "Edit Baggage Carousel", props: props, carousel: carouselData });
	} catch (error) {
		next(error);
	}
});

/* UPDATE /admin/carousels/edit/:_id */
router.post("/edit/:_id", async (req, res, next) => {
	try {
		let carouselId = req.params._id;
		await Carousel.findByIdAndUpdate(
			carouselId,
			{
				name: req.body.name
			}
		);
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

/* DELETE /admin/carousels/delete/:_id */
router.get('/delete/:_id', async (req, res, next) => {
	try {
		let carouselId = req.params._id;
		await Carousel.deleteOne({ _id: carouselId });
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
