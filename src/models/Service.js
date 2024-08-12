const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: String,
  price: Number,
  providedBy: {type: mongoose.Schema.Types.ObjectId, ref: "Staff"},
})

const Service = mongoose.model("Service", serviceSchema)
module.exports = Service