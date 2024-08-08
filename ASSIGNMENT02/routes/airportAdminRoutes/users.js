var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const User = require("../../models/user");
// const e = require("express");
const role = require("../../models/role");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Define the props object
const props = {
  type: "User",
  breadcrumbs: "Admin / Users",
  url: "admin/users",
};

/* GET /admin/users/admins */
router.get("/admins", async (req, res, next) => {
  try {
    let admins = await User.find({ role: "admin" }).sort([
      ["name", "ascending"],
    ]);
    res.render(`${props.url}/admins`, {
      layout: mainLayout,
      title: "Administrators",
      props: props,
      dataset: admins,
    });
  } catch (error) {
    next(error);
  }
});

/* GET /admin/users/agents */
router.get("/agents", async (req, res, next) => {
  try {
    let agents = await User.find({ role: "agent" }).sort([
      ["name", "ascending"],
    ]);
    res.render(`${props.url}/agents`, {
      layout: mainLayout,
      title: "Agents",
      props: props,
      dataset: agents,
    });
  } catch (error) {
    next(error);
  }
});

/* GET /admin/users/users */
router.get("/users", async (req, res, next) => {
  try {
    let users = await User.find({ role: "user" }).sort([
      ["name", "ascending"],
    ]);
    res.render(`${props.url}/users`, {
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
router.get("/add", (req, res, next) => {
  res.render(`${props.url}/add`, {
    layout: mainLayout,
    title: "Add User",
    props: props,
  });
});

/* POST /admin/users/add */
router.post("/add", async (req, res, next) => {
  try {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: bcrypt.hash(req.body.password, saltRounds),
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
