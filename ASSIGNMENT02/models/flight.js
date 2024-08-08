const mongoose = require("mongoose");
const dataSchemaObject = {
	flightNumber: {
		type: String,
		required: true
	},
	airline: {
		type: String,
		required: true
	},
	movementType: {
		type: String,
		required: true
	},
	originAirport: {
		type: String,
		required: true
	},
	originCity: {
		type: String,
		required: true
	},
	destinationAirport: {
		type: String,
		required: true
	},
	destinationCity: {
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
	gate: {
		type: String,
		required: true
	},
	carousel: {
		type: String
	},
	status: {
		type: String,
		// enum: ['Scheduled', 'Departed', 'Landed', 'Cancelled'],
		default: 'Scheduled'
	}
};
const mongooseSchema = mongoose.Schema(dataSchemaObject, {
	timestamps: true
});
module.exports = mongoose.model("Flight", mongooseSchema);