var mongoose = require("mongoose");
const Joi = require("@hapi/joi");

var bookingSchema = mongoose.Schema({
  name: String,
  table_no: Number,
  date:Date
});
const Booking = mongoose.model("Booking", bookingSchema);

function validateBooking(data) {
	const schema = Joi.object({
	  table_no: Joi.number().required(),
    name: Joi.string().required(),
    date: Joi.date()

	});
	return schema.validate(data, { abortEarly: false });
  }
  module.exports.Booking = Booking;
  module.exports.validate = validateBooking;
