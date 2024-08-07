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
  },
  createDate: {
    type: Date
  },
};
const mongooseSchema = mongoose.Schema(dataSchemaObject);
module.exports = mongoose.model("Airline", mongooseSchema);