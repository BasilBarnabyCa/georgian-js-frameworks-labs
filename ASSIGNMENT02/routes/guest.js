var express = require("express");
var router = express.Router();

var authRouter = require("./guestRoutes/auth");
router.use("/", authRouter);

var guestRouter = require("./guestRoutes/guest");
router.use("/", guestRouter);

module.exports = router;
