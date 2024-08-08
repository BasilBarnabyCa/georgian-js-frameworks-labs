const mongoose = require("mongoose");
const dataSchemaObject = {
	name: {
		type: String,
		required: true,
	},
	iata: {
		type: String,
		required: true,
	},
	icao: {
		type: String,
		required: true,
	},
	logo: {
		type: String
	}
};
const mongooseSchema = mongoose.Schema(dataSchemaObject, {
	timestamps: true
});
module.exports = mongoose.model("Airport", mongooseSchema);