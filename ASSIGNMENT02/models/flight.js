const mongoose = require("mongoose");
const dataSchemaObject = {
	flightNumber: {
		type: String,
		required: true,
		unique: true
	},
	departureAirport: {
		type: String,
		required: true
	},
	arrivalAirport: {
		type: String,
		required: true
	},
	departureTime: {
		type: Date,
		required: true
	},
	arrivalTime: {
		type: Date,
		required: true
	},
	airline: {
		type: String,
		required: true
	},
	aircraftModel: {
		type: String,
		required: true
	},
	status: {
		type: String,
		enum: ['Scheduled', 'Departed', 'Landed', 'Cancelled'],
		default: 'Scheduled'
	}
};
const mongooseSchema = mongoose.Schema(dataSchemaObject, {
	timestamps: true
});
module.exports = mongoose.model("Flight", mongooseSchema);