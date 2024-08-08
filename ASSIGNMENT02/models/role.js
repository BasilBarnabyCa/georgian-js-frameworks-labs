const mongoose = require("mongoose");
const dataSchemaObject = {
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String
	},
};
const mongooseSchema = mongoose.Schema(dataSchemaObject, {
	timestamps: true
});
module.exports = mongoose.model("Role", mongooseSchema);