const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const dataSchemaObject = {
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	role: {
		type: String,
		required: true,
	}
};
const mongooseSchema = mongoose.Schema(dataSchemaObject, {
	timestamps: true
});
mongooseSchema.plugin(plm, {
	usernameField: "email"
});
module.exports = mongoose.model("User", mongooseSchema);