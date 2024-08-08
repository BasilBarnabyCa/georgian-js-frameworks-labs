var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const Role = require("../../models/role");

// Define the props object
const props = {
	type: "Role",
	breadcrumbs: "Admin",
	url: "admin/roles"
};

/* GET /admin/roles */
router.get("/", async (req, res, next) => {
	try {
		let roles = await Role.find().sort([["name", "ascending"]]);
		res.render(`${props.url}/index`, { layout: mainLayout, title: "Roles", props: props, dataset: roles });
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/roles/add */
router.get("/add", (req, res, next) => {
	res.render(`${props.url}/add`, { layout: mainLayout, title: "Add Role", props: props });
});

/* POST /admin/roles/add */
router.post("/add", async (req, res, next) => {
	try {
		let newRole = new Role({
			name: req.body.name,
			description: req.body.description
		});
		await newRole.save();
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

/* SHOW /admin/roles/edit/:_id */
router.get("/edit/:_id", async (req, res, next) => {
	try {
		let roleId = req.params._id;
		let roleData = await Role.findById(roleId);
		res.render(`${props.url}/edit`, { layout: mainLayout, title: "Edit Role", props: props, role: roleData });
	} catch (error) {
		next(error);
	}
});

/* UPDATE /admin/roles/edit/:_id */
router.post("/edit/:_id", async (req, res, next) => {
	try {
		let roleId = req.params._id;
		await Role.findByIdAndUpdate(
			roleId,
			{
				name: req.body.name,
				description: req.body.description
			}
		);
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

/* DELETE /admin/roles/delete/:_id */
router.get('/delete/:_id', async (req, res, next) => {
	try {
		let roleId = req.params._id;
		await Role.deleteOne({ _id: roleId });
		res.redirect(`/${props.url}`);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
