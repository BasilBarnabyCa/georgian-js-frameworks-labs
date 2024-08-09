var express = require("express");
var router = express.Router();
var mainLayout = "layouts/main"; // Dashboard layout

const User = require("../../models/user");
const Role = require("../../models/role");

// Define the props object
const props = {
  type: "Subscriber",
  breadcrumbs: "Admin / Access Control",
  url: "admin/subscribers",
};

/* GET /admin/subscribers */
router.get("/", async (req, res, next) => {
  try {
    let users = await User.find({ role: "User" }).sort([["name", "ascending"]]);
    res.render(`${props.url}/index`, {
      layout: mainLayout,
      title: "Subscribers",
      props: props,
      dataset: users,
    });
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
