const mongoose = require("mongoose");
const dataSchemaObject = {
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
	}
};
const mongooseSchema = mongoose.Schema(dataSchemaObject, {
	timestamps: true
});
module.exports = mongoose.model("Route", mongooseSchema);