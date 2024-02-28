const mongoose = require("mongoose");

const carCollection = "Automoviles";

const carSchema = new mongoose.Schema({
  name: {type:String, require:true},
  brand: {type: String, require:true},
  model: { type: String, require: true },
  year: { type: Number, require: true },
  new: { type: Boolean, require: true },
  kms: { type: Number, require: true },
  engine: { type: String, require: true },
  version: { type: String, require: true },
  fuel: { type: String, require: true },
  traction: { type: String, require: true },
  price: {type: Number, require:true},
  image: [{type: String, require:true}],
  detalle: {type:String, require:false}
});

//agregado brand y price

module.exports = mongoose.model(carCollection, carSchema);
