var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const User = require("../../models/user");
const Role = require("../../models/role");
const bcrypt = require("bcrypt");
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
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, saltRounds),
      role: req.body.role,
    });
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
    res.render(`${props.url}/edit`, {
      layout: mainLayout,
      title: "Edit User",
      props: props,
      user: userData,
    });
  } catch (error) {
    next(error);
  }
});

/* UPDATE /admin/users/edit/:_id */
router.post("/edit/:_id", async (req, res, next) => {
  try {
    let userId = req.params._id;
    await User.findByIdAndUpdate(userId, {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: bcrypt.hash(req.body.password, saltRounds),
      role: req.body.role,
    });
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
