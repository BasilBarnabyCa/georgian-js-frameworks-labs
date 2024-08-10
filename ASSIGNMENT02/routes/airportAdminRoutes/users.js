var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const User = require("../../models/user");
const Role = require("../../models/role");
const bcrypt = require("bcrypt");
const roles = require("../../seeders/roles");
const saltRounds = 10;

// Define the props object
const props = {
  type: "User",
  breadcrumbs: "Admin / Access Control",
  url: "admin/users",
};

/* GET /admin/users */
router.get("/", async (req, res, next) => {
  try {
    let users = await User.find({ role: { $in: ["Admin", "Agent"] } }).sort([
      ["role", "ascending"],
    ]);
	console.log(users);
    res.render(`${props.url}/index`, {
      layout: mainLayout,
      title: "Users",
      props: props,
      dataset: users,
    });
  } catch (error) {
    next(error);
  }
});

/* SHOW /admin/users/add */
router.get("/add", async (req, res, next) => {
  let roleList = await Role.find({ name: { $in: ["Admin", "Agent"] } }).sort([
    ["name", "ascending"],
  ]);
  res.render(`${props.url}/add`, {
    layout: mainLayout,
    title: "Add User",
    props: props,
	roles: roleList
  });
});

/* POST /admin/users/add */
router.post("/add", async (req, res, next) => {
  try {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    });
	await newUser.setPassword(req.body.password);
    await newUser.save();
    res.redirect(`/${props.url}`);
  } catch (error) {
    next(error);
  }
});

/* SHOW /admin/users/edit/:_id */
router.get("/edit/:_id", async (req, res, next) => {
  try {
    let userId = req.params._id;
    let userData = await User.findById(userId);
	let roleList = await Role.find({ name: { $in: ["Admin", "Agent"] } }).sort([
		["name", "ascending"],
	  ]);
    res.render(`${props.url}/edit`, {
      layout: mainLayout,
      title: "Edit User",
      props: props,
      user: userData,
	  roles: roleList
    });
  } catch (error) {
    next(error);
  }
});

/* UPDATE /admin/users/edit/:_id */
router.post("/edit/:_id", async (req, res, next) => {
	try {
	  let userId = req.params._id;
	  let user = await User.findById(userId);
  
	  if (!user) {
		throw new Error("User not found");
	  }
  
	  user.name = req.body.name;
	  user.email = req.body.email;
	  user.role = req.body.role;
  
	  // If a new password is provided, set it using passport-local-mongoose's setPassword method
	  if (req.body.password && req.body.password.trim() !== "") {
		await user.setPassword(req.body.password);
	  }

	  await user.save();
  
	  res.redirect(`/${props.url}`);
	} catch (error) {
	  next(error);
	}
  });

/* DELETE /admin/users/delete/:_id */
router.get("/delete/:_id", async (req, res, next) => {
  try {
    let userId = req.params._id;
    await User.deleteOne({ _id: userId });
    res.redirect(`/${props.url}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
