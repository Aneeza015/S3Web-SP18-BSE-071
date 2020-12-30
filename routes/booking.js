var express = require('express');
var router = express.Router();
var {Booking,validate} = require("../models/booking");
var checkSessionAuth = require("../middlewares/checkSessionAuth");
/* GET home page. */
router.get("/", async function (req, res, next) {
  let products = await Booking.find();
  res.render("bookings/list", { title: "Bookings today", products });
});
router.get("/add",checkSessionAuth, async function (req, res, next) {
  res.render("bookings/add");
});
router.post("/add", async function (req, res, next) {
  const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
  let product = new Booking(req.body);
  await product.save();
  res.redirect("/bookings");
});
router.get("/delete/:id", async function (req, res, next) {
  let product = await Booking.findByIdAndDelete(req.params.id);
  res.redirect("/bookings");
});

module.exports = router;
