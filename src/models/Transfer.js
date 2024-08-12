const mongoose = require("mongoose")

const transferSchema = new mongoose.Schema({
  client: {type: mongoose.Schema.Types.ObjectId, ref: "Client"},
  fromLocation: String,
  toLocation: String,
  date: Date,
  staff: {type: mongoose.Schema.Types.ObjectId, ref: "Staff"},
})

const Transfer = mongoose.model("Transfer", transferSchema)
module.exports = Transfer