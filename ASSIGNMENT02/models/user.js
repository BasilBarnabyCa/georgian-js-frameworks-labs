const mongoose = require("mongoose");
const dataSchemaObject = {
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	}
};
const mongooseSchema = mongoose.Schema(dataSchemaObject, {
	timestamps: true
});
module.exports = mongoose.model("User", mongooseSchema);