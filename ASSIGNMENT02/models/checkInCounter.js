const mongoose = require("mongoose");
const dataSchemaObject = {
	name: {
		type: String,
		required: true,
	}
};
const mongooseSchema = mongoose.Schema(dataSchemaObject, {
	timestamps: true
});
module.exports = mongoose.model("CheckInCounter", mongooseSchema);