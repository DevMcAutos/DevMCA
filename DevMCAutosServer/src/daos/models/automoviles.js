const mongoose = require("mongoose");

const carCollection = "Automoviles";

const carSchema = new mongoose.Schema({
  model: { type: String, require: true },
  year: { type: Number, require: true },
  new: { type: Boolean, require: true },
  kms: { type: Number, require: true },
  engine: { type: String, require: true },
  version: { type: String, require: true },
  fuel: { type: String, require: true },
  traction: { type: String, require: true },
});

module.exports = mongoose.model(carCollection, carSchema);
